<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { Button } from '@/shared/ui/shadcn/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/ui/card';
  import { Input } from '@/shared/ui/shadcn/ui/input';
  import { AlertTriangle, LogOut, Send, User } from 'lucide-vue-next';

  type CmsUser = { name?: string; login?: string; avatarUrl?: string };

  const emits = defineEmits<{ (e: 'status-changed', value: boolean): void }>();

  const hasToken = ref(false);
  const user = ref<CmsUser | null>(null);
  const tokenInput = ref('');
  const loading = ref(false);
  const message = ref('');
  const errorMessage = ref('');
  const invalidPaths = ref<string[]>([]);
  const showInvalidModal = ref(false);
  const pushing = ref(false);
  const resetting = ref(false);

  const displayName = computed(() => user.value?.name || user.value?.login || 'Аккаунт');

  const notifyStatus = (value: boolean) => emits('status-changed', value);

  const fetchStatus = async () => {
    loading.value = true;
    errorMessage.value = '';

    try {
      const response = await $fetch<{ hasToken: boolean; user?: CmsUser }>('/api/cms/auth');
      hasToken.value = Boolean(response.hasToken);
      user.value = response.user || null;
      notifyStatus(hasToken.value);
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Не удалось получить статус';
      setTimeout(() => errorMessage.value = '', 5000);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchStatus();
  });

  const handleSaveToken = async () => {
    if (!tokenInput.value.trim()) {
      errorMessage.value = 'Введите токен';
      setTimeout(() => errorMessage.value = '', 5000);
      return;
    }
    loading.value = true;
    errorMessage.value = '';
    message.value = '';
    try {
      const response = await $fetch<{ hasToken: boolean; user?: CmsUser }>('/api/cms/auth', {
        method: 'POST',
        body: { token: tokenInput.value },
      });
      hasToken.value = Boolean(response.hasToken);
      user.value = response.user || null;
      tokenInput.value = '';
      message.value = 'Токен сохранён';
      setTimeout(() => message.value = '', 5000);
      notifyStatus(hasToken.value);
    } catch (error: unknown) {
      errorMessage.value = error instanceof Error ? error.message : 'Не удалось сохранить токен';
      setTimeout(() => errorMessage.value = '', 5000);
    } finally {
      loading.value = false;
    }
  };

  const handleLogout = async () => {
    loading.value = true;
    errorMessage.value = '';
    message.value = '';
    try {
      await $fetch('/api/cms/auth', { method: 'DELETE' });
      hasToken.value = false;
      user.value = null;
      notifyStatus(false);
      message.value = 'Токен удалён';
      setTimeout(() => message.value = '', 5000);
    } catch (error: unknown) {
      errorMessage.value = error instanceof Error ? error.message : 'Не удалось удалить токен';
      setTimeout(() => errorMessage.value = '', 5000);
    } finally {
      loading.value = false;
    }
  };

  const handlePush = async () => {
    pushing.value = true;
    errorMessage.value = '';
    message.value = '';
    invalidPaths.value = [];
    try {
      const response = await $fetch<{ ok?: boolean; invalidPaths?: string[] }>('/api/cms/push', { method: 'POST' });
      if (response?.invalidPaths?.length) {
        invalidPaths.value = response.invalidPaths;
        showInvalidModal.value = true;
        return;
      }
      if (response?.ok === false) {
        errorMessage.value = 'Не удалось отправить изменения';
        setTimeout(() => errorMessage.value = '', 5000);
        return;
      }
      message.value = 'Изменения отправлены';
      setTimeout(() => message.value = '', 5000);
    } catch (error: any) {
      if (error?.data?.invalidPaths) {
        invalidPaths.value = error.data.invalidPaths;
        showInvalidModal.value = true;
      } else {
        errorMessage.value = error instanceof Error ? error.message : 'Не удалось отправить изменения';
        setTimeout(() => errorMessage.value = '', 5000);
      }
    } finally {
      pushing.value = false;
    }
  };

  const handleReset = async () => {
    resetting.value = true;
    errorMessage.value = '';
    message.value = '';
    try {
      await $fetch('/api/cms/reset', { method: 'POST' });
      showInvalidModal.value = false;
      invalidPaths.value = [];
      message.value = 'Изменения обнулены';
      setTimeout(() => message.value = '', 5000);
      await fetchStatus();
    } catch (error: unknown) {
      errorMessage.value = error instanceof Error ? error.message : 'Не удалось обнулить изменения';
      setTimeout(() => errorMessage.value = '', 5000);
    } finally {
      resetting.value = false;
    }
  };

  const closeModal = () => {
    showInvalidModal.value = false;
  };
</script>

<template>
  <div class="cms-auth">
    <Card class="cms-auth-card">
      <CardHeader v-if="!hasToken">
        <CardTitle
          class="upperscase-text cms-auth-title"
        >
          Авторизация
        </CardTitle>
      </CardHeader>
      <CardContent class="p-6">
        <div
          v-if="!hasToken"
          class="h-96 flex flex-col justify-center"
        >
          <p class="text-sm">
            Введите ваш GitHub token
          </p>
          <div class="flex flex-col gap-3 mb-16 md:flex-row md:items-center">
            <Input
              v-model="tokenInput"
              :disabled="loading"
              placeholder="ghp_xxx..."
              class="p-0 px-3 w-full"
            />
            <Button
              :disabled="loading"
              @click="handleSaveToken"
            >
              <p v-if="!message && !errorMessage">
                Сохранить токен
              </p>
              <p
                v-else-if="message"
                class="text-sm text-[var(--strategix-accent)]"
              >
                {{ message }}
              </p>
              <p
                v-if="errorMessage"
                class="text-sm text-destructive"
              >
                {{ errorMessage }}
              </p>
            </Button>
          </div>
        </div>
        <div
          v-else
          class="flex flex-col gap-4"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="avatar">
                <img
                  v-if="user?.avatarUrl"
                  :src="user.avatarUrl"
                  alt="avatar"
                  class="avatar-image"
                >
                <div
                  v-else
                  class="avatar-placeholder"
                >
                  <User class="size-4" />
                </div>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold leading-tight">
                  {{ displayName }}
                </span>
                <span class="text-sm text-muted-foreground leading-tight">
                  {{ user?.login || 'GitHub' }}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                :disabled="loading || pushing"
                @click="handleLogout"
              >
                <LogOut class="size-4" />
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Button
                :disabled="pushing || loading"
                @click="handlePush"
              >
                <Send class="size-4" />
                <p v-if="!message && !errorMessage">
                  Отправить изменения
                </p>
                <p
                  v-else-if="message"
                  class="text-sm text-[var(--strategix-accent)]"
                >
                  {{ message }}
                </p>
                <p
                  v-if="errorMessage"
                  class="text-sm text-destructive"
                >
                  {{ errorMessage }}
                </p>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div
      v-if="showInvalidModal"
      class="modal-overlay"
    >
      <div class="modal-backdrop" />
      <div class="modal-card">
        <div class="flex items-center gap-2">
          <AlertTriangle class="size-5 text-amber-500" />
          <h3 class="text-lg font-semibold">
            Недопустимые изменения
          </h3>
        </div>
        <p class="text-sm text-muted-foreground">
          Найдены файлы вне разрешённых путей (public/, src/content/):
        </p>
        <ul class="modal-list">
          <li
            v-for="path in invalidPaths"
            :key="path"
          >
            {{ path }}
          </li>
        </ul>
        <div class="modal-actions">
          <Button
            variant="destructive"
            :disabled="resetting"
            @click="handleReset"
          >
            Обнулить изменения
          </Button>
          <Button
            variant="outline"
            @click="closeModal"
          >
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .cms-auth {
    width: 100%;
    height: 100%;
    max-width: 1024px;
    box-sizing: border-box;
  }

  .cms-auth-card {
    width: 100%;
    height: 98%;
    box-sizing: border-box;

    background-color: hsl(var(--card));
    border-radius: var(--card-radius);
  }

  .cms-auth-title{
    text-align: left;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #f4f4f5;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    display: inline-flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: #6b7280;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
  }

  .modal-card {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 20px;
    width: min(520px, 90vw);
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }

  .modal-list {
    list-style: disc;
    padding-left: 20px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
</style>

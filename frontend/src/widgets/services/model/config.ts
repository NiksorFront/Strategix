import type {Component} from "vue"
import {
  ReputationDecor,
  MediaDecor,
  BrandingDecor,
  ProductionDecor,
  EventsDecor,
  AiMarketingDecor,
  AdsDecor,
} from "@/shared/ui/service-decor";

export type ServiceId =
  | "reputation"
  | "media"
  | "branding"
  | "production"
  | "events"
  | "aiMarketing"
  | "ads"
  | "questions";

export interface ServiceItem {
  id: ServiceId;
  title: string;
  description: string;
  Decor: Component;
  gridArea: string;
}

export const services: ServiceItem[] = [
  {
    id: "reputation",
    title: "Построение репутации",
    description:
      "Формируем доверие к бренду, выстраиваем позитивный имидж и долгосрочные отношения с аудиторией.",
    Decor: ReputationDecor,
    gridArea: 'reputation'
  },
  {
    id: "media",
    title: "Медиа-сопровождение",
    description:
      "Создаём сильное присутствие в СМИ, продвигаем проекты и усиливаем внимание к ключевым событиям.",
    Decor: MediaDecor,
    gridArea: 'media',
  },
  {
    id: "branding",
    title: "Брендинг",
    description:
      "Разрабатываем уникальный образ компании, помогаем выделиться на рынке и завоевать доверие.",
    Decor: BrandingDecor,
    gridArea: 'branding',
  },
  {
    id: "production",
    title: "Продакшн",
    description:
      "Создаём фото, видео и креативный контент, который вдохновляет и помогает бренду быть ближе.",
    Decor: ProductionDecor,
    gridArea: 'production',
  },
  {
    id: "events",
    title: "Ивенты",
    description:
      "Организуем мероприятия любого формата, создаём впечатления.",
    Decor: EventsDecor,
    gridArea: 'events',
  },
  {
    id: "aiMarketing",
    title: "ИИ-маркетинг",
    description:
      "Используем технологии искусственного интеллекта для персонализации, анализа и повышения эффективности кампаний.",
    Decor: AiMarketingDecor,
    gridArea: 'ai-marketing'
  },
  {
    id: "ads",
    title: "Реклама",
    description:
      "Запускаем кампании, которые привлекают внимание, усиливают узнаваемость и мотивируют аудиторию действовать.",
    Decor: AdsDecor,
    gridArea: 'ads'
  },
  {
    id: "questions",
    title: "Остались вопросы?",
    description:"Свяжитесь с нами и мы поможем",
    Decor: AdsDecor,
    gridArea: 'questions'
  }
];

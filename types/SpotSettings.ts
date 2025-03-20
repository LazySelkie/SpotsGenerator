import type { Seed } from './Seed';

export interface SpotsSettings {
  seed: Seed; // если захотим все же делать сиды; возможно, его лучше строкой а не числом
  color: string; // spotColor1 и spotColor2 - цвета, между которыми рандомятся цвета пятен
  secondColor: string;
  backgroundColor: string;
  radiusMin: number;
  radiusMax: number;
  opacity: string; // прозрачность пятен; мб лучше двумя настройками сделать (макс и мин)
  spotsAmountMin: number; // spotsAmountMin и spotsAmountMax - мин. и макс. число генерируемых пятен
  spotsAmountMax: number;

  // что-нибудь про кучность? Тип насколько разбросаны по канвасу отдельные пятна
};
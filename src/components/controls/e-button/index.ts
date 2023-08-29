import { ButtonProps } from "ant-design-vue";
import EButton from "./EButton.vue";
export interface ButtonConfig extends ButtonProps{
    IsShowIcon?: boolean;
    IconName?: string;
}

export {EButton}
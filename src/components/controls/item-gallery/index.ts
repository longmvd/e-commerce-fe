import { CarouselProps } from "ant-design-vue";
import ItemGallery from "./ItemGallery.vue";

export interface ItemGalleryConfig extends CarouselProps{
    title?: string,
    textTransformTitle?: 'uppercase'|'none'|'lowercase'|'unset',
    keyExpr?: string,
    displayValue?: string
}

export {ItemGallery}
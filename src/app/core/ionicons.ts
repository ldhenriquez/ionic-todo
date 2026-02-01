import { addIcons } from 'ionicons';
import {
  add,
  addOutline,
  checkmarkDoneOutline,
  pricetagOutline,
  trashOutline,
  createOutline,
  searchOutline,
} from 'ionicons/icons';

export function registerIcons() {
  addIcons({
    add,
    'add-outline': addOutline,
    'checkmark-done-outline': checkmarkDoneOutline,
    'pricetag-outline': pricetagOutline,
    'trash-outline': trashOutline,
    'create-outline': createOutline,
    'search-outline': searchOutline,
  });
}

import { type App } from 'vue';
import { usePlugins } from './hooks';
import {
  Button,
  Popup,
  OverLay,
  Image,
  Icon,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  SearchBar,
  Input,
  Video,
  Skeleton,
  Avatar,
} from '@nutui/nutui-taro';

export default (app: App) => {
  const plugins = [
    Button,
    Popup,
    OverLay,
    Image,
    Icon,
    Tabbar,
    TabbarItem,
    Cell,
    CellGroup,
    SearchBar,
    Input,
    Video,
    Skeleton,
    Avatar,
  ];
  usePlugins(app, plugins);
};

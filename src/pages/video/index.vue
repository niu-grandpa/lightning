<script setup lang="tsx">
import { computed, ref } from 'vue';
import { HomeContainer, HomeSearchbar } from '../../components';
import { Video } from '@tarojs/components';

const source = ref<string[]>([
  'https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzQl&Signature=ViMFjz%2BOkBxS%2FY1rjtUVqbopbJI%3D',
  'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
]);

const Component = computed(() => () => (
  <HomeContainer scorllY={true} className='video-container'>
    <HomeSearchbar />
    {source.value.map(url => (
      <nut-cell className='video-cell'>
        <Video
          className='video-cell-item'
          key={url}
          src={url}
          loop={false}
          objectFit='cover'
          direction={-90}
          initialTime={0}
          controls={true}
          autoplay={false}
          mobilenetHintType={'2'}
        />
        <p>这是一个视频的简短描述!</p>
        <nut-row className='video-cell-item-info'>
          <nut-col span={3}>
            <nut-avatar
              icon='https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
              size='small'
            />
          </nut-col>
          <nut-col span={16}>大路解说</nut-col>
          <nut-col span={5} style={{ display: 'flex', alignItems: 'center' }}>
            <nut-icon name='comment' />
            <text style={{ margin: '0 5px', fontSize: '12px' }}>27</text>
            <nut-icon name='more-s' />
          </nut-col>
        </nut-row>
      </nut-cell>
    ))}
  </HomeContainer>
));
</script>

<template>
  <Component />
</template>

<style lang="less">
.video {
  &-container {
    height: 100% !important;
    padding: 90px 14px;
  }
  &-cell {
    margin-top: 35px;
    &-item {
      width: 100%;
      height: 190px;
      border-radius: 22px 22px 0 0;
      &-desc,
      &-info {
        padding: 8px 12px;
        background: #fff;
      }
      &-info {
        line-height: 14px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

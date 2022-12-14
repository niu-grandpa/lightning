<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, onMounted, ref } from 'vue';

const content = ref('');
const comment = ref<string[]>([]);
const id = computed(() => Math.round(Math.random() * 10));

const randomComment = () => {
  if (id.value % 2 !== 0) return;
  console.log(`${id.value} % 2 = 0`);
  const text = [
    '我是随机评论',
    '啦啦啦!',
    '真会编故事',
    '裁判加油。继续在决赛点杀对手。🤗',
    '勿忘国耻，振兴中华!',
    '打倒日本帝国主义!',
    '事实确实如此!',
    '不管向东还是向西，美国佬都会攻击咱们。做好自己，让他们瞎叫唤',
    '这个病毒对老人很不友好',
    '考10分的对考90分的指手画脚!',
    '网红为什么都这种脸型，一点辨识度都没有。难道都是一个妈生的？😁',
    '实现不了',
    '把足协一窝端了不行么？',
    '为何要那么重点讲解第三种方法呢？',
    '码头陈如果没事，国足可以解散了s',
    '招聘前端开发工程师',
    '2022卡塔尔世界杯 C罗落幕了😭',
    '计算机相关专业本科以上，5 年以上前端开发经验，电商相关经验优先。',
  ];

  for (let i = 0; i < 5; i++) {
    let ran = Math.floor(Math.random() * text.length);
    comment.value.push(text.splice(ran, 1)[0]);
  }
};

const handleSubmit = () => {
  Taro.showToast({ title: '发表成功' });
  comment.value.push(content.value);
  content.value = '';
};

onMounted(() => {
  randomComment();
});
</script>

<template>
  <section class="news-comment">
    <h3 class="news-comment-title">全部评论</h3>
    <nut-empty v-if="!comment.length" description="抢沙发，发首评，稳占C位!" />
    <nut-row v-else v-for="item in comment" :key="item" style="margin-bottom: 30px">
      <nut-col :span="3">
        <nut-avatar icon="my" shape="round" />
      </nut-col>
      <nut-col :span="17" style="margin-left: 14px">
        <p class="news-comment-name">匿名用户</p>
        <p>{{ item }}</p>
      </nut-col>
      <nut-col :span="2">
        <nut-icon name="fabulous" style="margin-left: 26px" />
      </nut-col>
    </nut-row>
  </section>

  <section class="news-comment-input">
    <nut-row>
      <nut-col :span="14">
        <nut-searchbar
          v-model="content"
          placeholder="我来说两句"
          :clearable="false"
          input-background="#f6f7f9"
          @search="handleSubmit"
        />
      </nut-col>
      <nut-col :span="10">
        <nut-grid :column-num="3" :border="false" clickable icon-size="20">
          <nut-grid-item icon="message" />
          <nut-grid-item icon="star" />
          <nut-grid-item icon="share" />
        </nut-grid>
      </nut-col>
    </nut-row>
  </section>
</template>

<style lang="less">
.news-comment {
  padding: 5px;
  &-title {
    margin-bottom: 24px;
    text-align: center;
    font-weight: bold;
  }
  &-name {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
  }
  &-input {
    width: 100%;
    border-top: 1px solid #eaeaea;
    z-index: 9999;
    background-color: #fff;
  }
}
</style>

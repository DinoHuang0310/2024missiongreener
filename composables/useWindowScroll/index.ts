import { ref, computed } from 'vue';

interface Range {
  start: number;
  end: number;
}

const scrollTop = ref<number>(0);

const update = function(): void {
  const y = window.pageYOffset || document.documentElement.scrollTop;

  scrollTop.value = y;
}
window.addEventListener('scroll', update);
update();

export default (breakPoint: number = 0, between?: Range) => {
  const breakPointRef = ref(breakPoint);

  const overY = computed<boolean>(() => scrollTop.value > breakPointRef.value);

  const betweenY = computed<boolean>(() => {
    return between ? (
      scrollTop.value > between.start && scrollTop.value < between.end
    ) : false;
  });

  return {
    scrollTop,
    overY,
    betweenY,
  }
}
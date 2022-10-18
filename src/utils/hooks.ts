import { inject, provide } from "vue";
// context 实例本身就已经包含了 key 与值的类型了
interface Context<T> {
  key: Symbol;
  init?: T;
}

/**
 * 创建一个上下文，用于在当前组件的所有子孙组件共享状态
 * 基于 provide/inject 实现，但支持强类型，而且使用 Symbol，永不重复而且无需考虑命名问题
 * @param init
 * @param key
 */
export function createContext<T>(init?: T, key?: string): Context<T> {
  return {
    key: Symbol(key),
    init,
  };
}

/**
 * 为所有子孙组件注入状态
 * @param context
 * @param value
 */
export function useProvide<T>(context: Context<T>, value: T) {
  provide(context.key, value);
}

/**
 * 使用祖先节点注入的状态，可能为 null/undefined
 * @param context
 */
export function useInject<T>(context: Context<T>): T | undefined {
  return inject(context.key, context.init);
}

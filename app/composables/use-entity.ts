export function useEntity<M extends object, R extends object>() {
  const create = ({ from }: { from: R }): M => {
    const model: Partial<M> = {}
    Object.assign(model, from)
    return model as M
  }

  const copy = ({ from, to }: { from: R | M, to: M}) => {
    Object.assign(to, from)
  }

  return { create, copy }
}

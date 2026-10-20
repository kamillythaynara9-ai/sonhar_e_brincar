/**
 * Arrastar com o mouse um trilho de rolagem horizontal, com inércia.
 * No toque o próprio navegador já arrasta (scroll nativo), então só o
 * mouse é tratado aqui. Um arraste não vira clique no link de baixo.
 */
import { useEffect, type RefObject } from "react";

export function useArrastar(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x0 = 0;
    let rolagem0 = 0;
    let arrastando = false;
    let moveu = false;
    let velocidade = 0;
    let ultimoX = 0;
    let quadro = 0;

    const baixo = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      arrastando = true;
      moveu = false;
      x0 = ultimoX = e.clientX;
      rolagem0 = el.scrollLeft;
      velocidade = 0;
      cancelAnimationFrame(quadro);
      el.classList.add("arrastando");
    };
    const mover = (e: PointerEvent) => {
      if (!arrastando) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 5) moveu = true;
      velocidade = e.clientX - ultimoX;
      ultimoX = e.clientX;
      el.scrollLeft = rolagem0 - dx;
    };
    const soltar = () => {
      if (!arrastando) return;
      arrastando = false;
      el.classList.remove("arrastando");
      const inercia = () => {
        velocidade *= 0.92;
        el.scrollLeft -= velocidade;
        if (Math.abs(velocidade) > 0.5) quadro = requestAnimationFrame(inercia);
      };
      quadro = requestAnimationFrame(inercia);
    };
    const clique = (e: MouseEvent) => {
      if (moveu) {
        e.preventDefault();
        e.stopPropagation();
        moveu = false;
      }
    };
    el.addEventListener("pointerdown", baixo);
    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerup", soltar);
    el.addEventListener("click", clique, true);
    return () => {
      el.removeEventListener("pointerdown", baixo);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      el.removeEventListener("click", clique, true);
      cancelAnimationFrame(quadro);
    };
  }, [ref]);
}

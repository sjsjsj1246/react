const hooks = [];
let currentComponent = -1; //* 함수형 컴포넌트의 개수 저장

export class Component {}

export function useState(initValue) {
  const position = currentComponent;

  if (!hooks[position]) {
    hooks[position] = initValue;
  }

  return [
    hooks[position],
    (nextValue) => {
      hooks[position] = nextValue;
    },
  ];
}

function renderRealDom(vdom) {
  if (typeof vdom === "string") {
    return document.createTextNode(vdom);
  }
  if (vdom === undefined) return;

  const $el = document.createElement(vdom.tagName);

  vdom.children.map(renderRealDom).forEach((node) => {
    $el.appendChild(node);
  });
  return $el;
}

export const render = (function () {
  let prevVdom = null;

  return function render(nextVdom, container) {
    if (prevVdom === null) {
      prevVdom = nextVdom;
    }

    container.appendChild(renderRealDom(nextVdom));
  };
})();

export function createElement(tagName, props, ...children) {
  if (typeof tagName === "function") {
    if (tagName.prototype instanceof Component) {
      const instance = new tagName({ ...props, children });
      return instance.render();
    } else {
      currentComponent++;
      return tagName.apply(null, [props, ...children]);
    }
  }
  return {
    tagName,
    props,
    children,
  };
}

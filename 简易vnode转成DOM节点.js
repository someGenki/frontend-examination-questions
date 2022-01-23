function render(vnode, container) {

}

// ==TEST==
const vnode = {
  tag: 'div',
  attr: {id: 'container'},
  children: [
    {
      tag: 'p',
      attr: {},
      children: ['part1']
    }, {
      tag: 'p',
      attr: {},
      children: ['part2']
    }
  ]
}
/*
<div id='container'>
	  <p>part1</p>
	  <p>part2</p>
</div>
*/

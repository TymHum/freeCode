import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

/*
document.getElementById('preview').innerHTML =
    marked.parse('# Marked in the browser\n\n**Rendered** by **marked**.');
*/

marked.setOptions({
  gfm: true,
  breaks: true,
});

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: `# This is a Heading (H1 size)

## This is a Sub Heading (H2 size)

Here is a link to [OpenAI](https://www.openai.com).

This is a paragraph with some **bolded text** and some \`inline code\`.

Here is a code block:

\`\`\`javascript
function greet() {
    console.log("Hello, world!");
}
\`\`\`

Here is a list of items:
- First item
- Second item
- Third item

Here is a blockquote:
> This is a blockquote. It can be used to highlight a section of text.

Here is an image:
![OpenAI Logo](https://www.openai.com/assets/images/openai-default-logo-300x95.svg)
`
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.getElementById('preview').innerHTML = marked.parse(this.state.input);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      document.getElementById('preview').innerHTML = marked.parse(this.state.input);
    }
  }

  handleChange(event){
    this.setState({
      input: event.target.value
    })
  }
  
  render() {
    return (
      <>
        <textarea id="editor" value={this.state.input} onChange={this.handleChange}></textarea>
        <div id="preview" ></div>
    
      </>
      )
  }
 
}


class AppWrapper extends React.Component {
  render() {
    return (
      <>
        <Editor/>
      </>
    );
  }
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)

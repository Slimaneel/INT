import React, {useState} from 'react';
import MathJax from "react-mathjax2";
import parse from "html-react-parser";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Field() {
  const [text, setText] = useState("")
  return (
    <div className="Field">
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData()
            setText(data)
          }}
        >

        </CKEditor>
        </div>
        <div>

        
        <p> <MathJax.Context>
                <MathJax.Text text={parse(text)} />
                </MathJax.Context></p>


        
      </div>
    
    </div>
  );
}

export default Field;
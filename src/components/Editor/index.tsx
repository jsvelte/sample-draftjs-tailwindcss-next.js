import { Editor as DraftEditor, EditorCommand, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useCallback, useRef, useState } from 'react'
import blockStyleFn from './blockStyleClasses'
import BlockStyleControls from './BlockStyleControls'
import EditorContext from './EditorContext'
import EraseButton from './EraseButton'
import InlineStyleButtons from './InlineStyleButtons'
import { getInitialContent, saveContent } from './utils'

type Props = {
  id?: string
}

const Editor = ({ id }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(getInitialContent(id))

  const editor = useRef<null | DraftEditor>(null)

  const focusEditor = useCallback(() => {
    editor.current && editor.current.focus()
  }, [])

  const handleContentChange = (editorState: EditorState) => {
    saveContent(editorState, id)
    setEditorState(editorState)
  }

  const handleKeyCommand = useCallback((command: EditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }, [])

  return (
    <EditorContext.Provider
      value={{
        id,
        editorState,
        setEditorState
      }}
    >
      <div className="m-4 max-w-xl">
        <div className="mb-1 flex items-center pr-4">
          <div className="ml-auto flex items-center space-x-5">
            <BlockStyleControls />
            <InlineStyleButtons />
            <EraseButton />
          </div>
        </div>
        <div
          className="prose prose-stone h-[500px] overflow-scroll rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
          onClick={focusEditor}
        >
          <DraftEditor
            ref={editor}
            editorState={editorState}
            onChange={handleContentChange}
            handleKeyCommand={handleKeyCommand}
            placeholder="Tell a story..."
            blockStyleFn={blockStyleFn}
          />
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default Editor

import React, { useState, useRef, useEffect } from "react";
import { FaBold, FaItalic, FaUnderline, FaUndo, FaRedo } from "react-icons/fa";
import { MdColorLens, MdError, MdFormatSize } from "react-icons/md";
import { TooltipProvider, Tooltip } from "@radix-ui/react-tooltip";
import { SketchPicker } from "react-color";
import { IoMdBrush } from "react-icons/io";
import './editor.css'
import ApiServices from "../../Service/ApiService";

const AddEditor = ({content,setContent}) => {
  const [story, setStory] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const editorRef = useRef(null);
  const maxChars = 5000;

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (editorRef.current) {
      editorRef.current.focus();
      console.log(editorRef.current.innerText)
    }
  }, []);

  const handleTextChange = (e) => {
    const text = editorRef.current.innerText;
    console.log(editorRef.current.innerText)
    // if (text.length <= maxChars) {
    //   setStory(text);
    //   setContent(text)
    //   setCharCount(text.length);
    //   setError("");
    //   addToHistory(text);
    // } else {
    //   setError("Character limit exceeded!");
    // }
  };

  const addToHistory = (text) => {
    const newHistory = [...history.slice(0, currentStep + 1), text];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const [suggestion,setSugg] = useState(false)

  const handleAiSuggestion=async()=>{
    setSugg(true)
    try{
      const response = await ApiServices.getAiSuggestion({content})
      setSugg(false)
      setContent(response.generatedContent)

      const re = response.generatedContent
      console.log(re)
      editorRef.current.innerText = "";
      
    }
    catch(err){
      console.log(err)
      setSugg(false)
    }

  }

  const suggestRef = useRef()

  const handleContentChange=(e)=>{
    setContent(e.target.value)
    setCharCount(e.target.value.length)
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto bg-gray-950 rounded-lg">
        <div className="mb-4">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Story Editor</h2> */}

          <div className="flex flex-wrap gap-2 p-3 bg-black rounded-t-lg border border-gray-900">
            {/* Toolbar Buttons */}
            <Tooltip>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => formatText("bold")}
              >
                <FaBold className="text-gray-600" />
              </button>
            </Tooltip>
            <Tooltip>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => formatText("italic")}
              >
                <FaItalic className="text-gray-600" />
              </button>
            </Tooltip>
            <Tooltip>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => formatText("underline")}
              >
                <FaUnderline className="text-gray-600" />
              </button>
            </Tooltip>
          </div>

          {/* ContentEditable Div */}
          {!suggestion?<textarea
            ref={editorRef}
            onInput={handleTextChange}
            value={content}
            className={`aitext w-full text-[15px] min-h-[300px] leading-[1.8] bg-gray-950 p-4 text-left border-l border-r border-b border-gray-900 focus:outline-none flex flex-col ${suggestion&&'justify-center'}`}
            onChange={handleContentChange}
            aria-label="Story content"
            role="textbox"
          >
          </textarea>:
          <div
            ref={suggestRef}
            contentEditable={'false'}
            className={`w-full min-h-[300px] bg-gray-950 p-4 text-left border-l border-r border-b border-gray-900 focus:outline-none flex flex-col pt-7`}
            onInput={handleTextChange}
            aria-label="Story content"
            role="textbox"
          >
            {suggestion&&<div className="contenai flex flex-col gap-3">
            <p className="p1 w-[90%] h-[15px]"></p>
            <p className="p2 w-[90%] h-[15px]"></p>
            <p className="p3 w-[90%] h-[15px]"></p>
            <p className="p4 w-[90%] h-[15px]"></p>
            <p className="p5 w-[90%] h-[15px]"></p>
            </div>}
          </div>}

          {/* Character Count and Error */}
          <div className="pt-2 flex bg-black mb-10 justify-between items-center">
            <div className="text-sm w-full text-gray-500 flex items-center gap-3 justify-between">
              <p>{charCount}/{maxChars} characters</p>
              <p className="flex items-center gap-2 border border-gray-800 px-4 py-1 rounded-md cursor-pointer hover:bg-gray-800 transition duration-300 ease" onClick={handleAiSuggestion}>Get AI Suggestion <span><IoMdBrush /></span></p>
            </div>
            {error && (
              <div className="flex items-center text-red-500 text-sm">
                <MdError className="mr-1" />
                {error}
              </div>
            )}
          </div>

          {/* Get HTML Button */}
          {/* <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={getHTMLContent}
            >
              Get HTML Content
            </button>
          </div> */}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AddEditor;

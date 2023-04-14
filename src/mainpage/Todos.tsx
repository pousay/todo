import { useContext, useEffect, useReducer, useRef, useState } from "react";
import SaveTodos, { fetchTodos } from "../globalComponents/LsSaver";
import EditTaskModal from "./modal";
import Navbar from "../globalComponents/Navbar";
import Cases from "../reducer/Cases";
import { initState, reducer } from "../reducer/reducer";
import { SettingContext } from "../globalComponents/Context";
export const playAudio = (audio: any, access: boolean) => {
  if (access) {
    audio.play();
  }
};
function Todos() {
  const { settings } = useContext(SettingContext);

  const [state, dispatch] = useReducer(reducer, initState);
  const [Value, setValue] = useState("");
  const [EditedTaskID, setEditedTaskID] = useState(0);
  const [ShowModal, setShowModal] = useState(false);

  const addAudio = useRef(null);
  const removeAudio = useRef(null);

  const Addtask = () => {
    if (Value.trim() !== "") {
      dispatch({ type: Cases.AddTodo, payload: Value });
      setValue("");
      playAudio(addAudio.current, settings.sounds);
    }
  };

  const Tasks = (todos: []) => {
    return todos.map((todo: any) => (
      <div className="task py-0" key={todo.id}>
        <div className={todo.isDone ? "cont-1 completed" : "cont-1"}>
          <i
            className={
              todo.isDone
                ? "fa-regular fa-circle done-one cirl"
                : "fa-regular fa-circle done-one"
            }
            onClick={() => {
              dispatch({ type: Cases.DoneUnDone, payload: todo.id });
              if (settings.deleteOnDone && !todo.isDone) {
                playAudio(removeAudio.current, true);
              }
            }}
          ></i>
          <p className="task-text my-2">{todo.task}</p>
        </div>
        <div className="each-task-cont">
          <div
            className="cont-2"
            onClick={() => {
              dispatch({ type: Cases.RemoveTodo, payload: todo.id });
              playAudio(removeAudio.current, settings.sounds);
            }}
          >
            <i className="fa-solid fa-trash-can delete-one"></i>
          </div>
          <span
            onClick={() => {
              setEditedTaskID(todo.id);
              setShowModal(true);
            }}
            className="fa fa-pencil"
          ></span>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    const todos = fetchTodos();
    if (todos.length > 0) {
      dispatch({ type: Cases.FirstSave, payload: fetchTodos() });
    }
  }, []);

  useEffect(() => {
    SaveTodos(state?.todos);
    if (settings.deleteOnDone && state.todos.length > 0) {
      const unCompletedTodos = state?.todos.filter((todo: any) => !todo.isDone);
      if (state.todos.length !== unCompletedTodos.length) {
        dispatch({ type: Cases.FirstSave, payload: unCompletedTodos });
      } else {
      }
    }
  }, [state?.todos, settings.deleteOnDone]);

  return (
    <>
      <Navbar what={1} />
      <EditTaskModal
        show={ShowModal}
        onHide={setShowModal}
        TaskID={EditedTaskID}
        state={state}
        dispatch={dispatch}
        audio={addAudio}
      />
      <main>
        <section className="to-do-list">
          <div className="content-image"></div>
          <div className="content-act">
            <div className="status">
              <span>Tasks : {state?.todos.length}</span>
              <span>
                Completed :{" "}
                {state?.todos.filter((todo: any) => todo.isDone).length}
              </span>
            </div>
          </div>
          <div className="add-task">
            <span
              className="del"
              onClick={() => {
                dispatch({ type: Cases.Reset });
                playAudio(removeAudio.current, settings.sounds);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </span>
            <input
              value={Value}
              onChange={(e: any) => {
                setValue(e.target.value);
              }}
              type="text"
              placeholder="Add Your Task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  Addtask();
                }
              }}
            />
            <span className="add-task-btn" onClick={Addtask}>
              <i className="fa-solid fa-plus"></i>
            </span>
          </div>
          {state?.todos.length <= 0 && (
            <div className="no-tasks pb-0">
              <p>
                <i className="fa-regular fa-circle-xmark"></i> No Tasks To Show
              </p>
            </div>
          )}
          <div className="tasks">
            {state?.todos.length > 0 && Tasks(state?.todos)}
          </div>
        </section>
        {/* Audio Sounds  */}
        <audio
          ref={addAudio}
          src="./audios/addt.wav"
          preload="auto"
          id="addAud"
        ></audio>
        <audio
          ref={removeAudio}
          src="./audios/remove.wav"
          preload="auto"
          id="removeAud"
        ></audio>
      </main>
    </>
  );
}

export default Todos;

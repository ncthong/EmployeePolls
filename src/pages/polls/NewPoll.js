import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {handleAddQuestion} from "../../service/actions/questions";

const NewPoll = ({dispatch}) => {
    const navigate = useNavigate();
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const inputOption = (e, option) => {
        const value = e ? e.target.value : "";
        option === "1" ?  setFirstOption(value) : setSecondOption(value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!firstOption || !secondOption) {
            alert("Please input First Option & Second Option!")
            return;
        }
        dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/", { replace: true });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mt-9 text-center">Would You Rather</h1>
            <h3 className="text-1xl mt-9 text-center">Create Your Own Poll</h3>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstOption" data-testid="firstLabel">
                    First Option
                </label>
                <input 
                    value={firstOption}
                    onChange={(e) => inputOption(e, "1")}
                    type="text"
                    name="firstOption"
                    id="firstOption"
                    data-testid="firstOption"
                    placeholder="First Option"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secondOption" data-testid="secondLabel">
                    Second Option
                </label>
                <input 
                    value={secondOption}
                    onChange={(e) => inputOption(e, "2")}
                    type="text"
                    name="secondOption"
                    id="secondOption"
                    data-testid="secondOption"
                    placeholder="Second Option"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" data-testid="submit-poll">
                    Submit
                </button>
                </div>
            </form>
  
        </div>
    );
};

export default connect()(NewPoll);

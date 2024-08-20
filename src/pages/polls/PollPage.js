import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../service/actions/questions";

const PollPage = ({ dispatch, authedUser, users, questions }) => {
    const [isVotedOne, setIsVotedOne] = useState(false);
    const [isVotedTwo, setIsVotedTwo] = useState(false);
    const [question, setQuestion] = useState({});
    const [author, setAuthor] = useState("");
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        const ques = Object.values(questions).find((ques) => ques.id === id);
        if (ques) {
            setAuthor(users[ques.author]);
            setQuestion(ques);
            setIsVotedOne(ques.optionOne.votes.includes(authedUser.id));
            setIsVotedTwo(ques.optionTwo.votes.includes(authedUser.id));
        }
        if (!authedUser || !ques) {
            navigate('/404');
        }

    }, [authedUser, questions, users]);

    const choiseAnswer = (e, option) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, option === "1" ? "optionOne" : "optionTwo"));
    };

    const calcVote = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        return (question[option].votes.length / numberVotesTotal * 100).toFixed(2) + "%";
    };

    return (
        <div>
            {question && author && (
                <div>
                    <h1 className="text-3xl font-bold mt-9 text-center">Poll by {author.id}</h1>
                    <div className="flex justify-center">
                        <img src={author.avatarURL} alt="Profile" className="h-24 w-24"/>
                    </div>
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className={isVotedOne ? "bg-lime-600 text-center" : "bg-slate-200 text-center"}>
                            <p className="font-bold mb-2">{question.optionOne.text}</p>
                            {!isVotedOne && !isVotedTwo &&
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={(e) => choiseAnswer(e, "1")}>Click</button>
                            }
                            {(isVotedOne || isVotedTwo ) && (
                                <p className="text-red-800 font-bold">Votes: {question.optionOne.votes.length} ({calcVote("optionOne", question)})</p>
                            )}
                        </div>
                        <div className={isVotedTwo ? "bg-lime-600 text-center" : "bg-slate-200 text-center"}>
                            <p className="font-bold mb-2">{question.optionTwo.text}</p>
                            {!isVotedOne && !isVotedTwo && (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={(e) => choiseAnswer(e, "2")}>Click</button>
                            )}
                            {(isVotedOne || isVotedTwo ) && (
                                <p className="text-red-800 font-bold">Votes: {question.optionTwo.votes.length} ({calcVote("optionTwo", question)})</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
    return { authedUser, users, questions };
};

export default connect(mapStateToProps)(PollPage);

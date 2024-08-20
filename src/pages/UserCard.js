import {connect} from "react-redux";
import {Link} from "react-router-dom";

const UserCard = ({question, author}) => {
    return (
        <div className="m-3 p-2 rounded-xl shadow-md hover:shadow-xl transition bg-zinc-300 max-w-sm mx-auto flex items-center space-x-4">
            <div className="shrink-0">
                <img className="h-12 w-12" src={author?.avatarURL} alt="Author" />
            </div>
            <div>
                <div className="text-xl font-medium text-black">{question.author}</div>
                <p className="text-xs italic">{new Date(question.timestamp).toDateString()}</p>
            </div>
            <Link to={"questions/" + question.id} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Show</Link>
        </div>
    );
}

export default connect()(UserCard);

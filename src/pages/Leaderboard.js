import {connect} from "react-redux";

const Leaderboard = ({users}) => {
    return (
        <div className="h-screen overflow-hidden flex items-center justify-center">
            <table className="w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                        User
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Answered
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Created
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <span className="font-bold">{user.name}</span>
                                    <br/>{user.id}</td>
                                <td className="px-6 py-4">{Object.keys(user.answers).length}</td>
                                <td className="px-6 py-4">{user.questions.length}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({users}) => ({
    users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

export default connect(mapStateToProps)(Leaderboard);

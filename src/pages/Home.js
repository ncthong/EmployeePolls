import {connect} from "react-redux";
import UserCard from "./UserCard";
import { Box, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { useState } from "react";
import { TabList, TabPanel } from "@mui/lab";
// import React, { useState } from "react";
import PropTypes from "prop-types";

const Home = ({authedUser, questions, users}) => {
    const [value, setValue] = useState('1');

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));

        const handleChange = (event, newValue) => {
            setValue(newValue);
          };

    return (
        <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="New Questions" value="1" />
                        <Tab label="Done" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-200">
                        {questions
                            .filter(unanswered)
                            .map((question) => (
                                <li key={question.id}>
                                    <UserCard question={question} author={users[question.author]}/>
                                </li>
                        ))}
                    </ul>
                </TabPanel>
                <TabPanel value="2">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-200">
                        {questions
                            .filter(answered)
                            .map((question) => (
                                <li key={question.id}>
                                    <UserCard question={question} author={users[question.author]}/>
                                </li>
                        ))}
                    </ul>
                </TabPanel>
            </TabContext>
        </div>
    );
}

Home.propTypes = {
    authedUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        optionOne: PropTypes.shape({
            votes: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        optionTwo: PropTypes.shape({
            votes: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        author: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
    })).isRequired,
    users: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatarURL: PropTypes.string.isRequired,
    })).isRequired,
};

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Home);

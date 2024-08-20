const {_saveQuestionAnswer, _saveQuestion} = require("./_DATA");
describe("_saveQuestion &_saveQuestionAnswer", () => {

    it("Save question is success", async () => {
        const question = {
            optionOneText: "Option 1 test",
            optionTwoText: "Option 2 test",
            author: {
                id: "ThongNC",
                name: "Thong Nguyen Canh",
                password: "1234567",
                avatarURL: "/images/avatars/hacker.png",
                answers: {
                    "8xf0y6ziyjabvozdd253nd": "optionOne",
                    "6ni6ok3ym7mf1p33lnez": "optionOne",
                    "am8ehyc8byjqgar0jgpub9": "optionTwo",
                    "loxhs1bqm25b708cmbf3g": "optionTwo"
                },
                questions: [
                    "8xf0y6ziyjabvozdd253nd",
                    "am8ehyc8byjqgar0jgpub9"
                ]
            }
        }
        const response = await _saveQuestion(question);

        expect(response).toBeTruthy();
    });

    it("Save question is error", async () => {
        const question = {
            loxhs1bqm25b708cmbf3g: {
                id: 'loxhs1bqm25b708cmbf3g',
                author: 'tylermcginnis',
                timestamp: 1482579767190,
                optionOne: {},
                optionTwo: {}
            },
        }
        const response = await _saveQuestion(question).catch(e => e);

        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });


    it("Save question and answer is success", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "ThongNC",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("Save question and answer is error", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "",
            qid: undefined,
            answer: ""
        }).catch(e => e);

        expect(response).toBe("Error! Please provide all infor");
    });
    
});

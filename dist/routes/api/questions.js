"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
var Question = require('../../model/Question');
var auth = require('../../middleware/auth');
var User = require('../../model/User');
var Comment = require('../../model/Comments');
var Upvote = require('../../model/Upvotes');
router.post('/', auth, [
    check('subject', 'Subject is required').not().isEmpty(),
    check('section', 'Section is required').not().isEmpty(),
    check('problem', 'Problem is required').not().isEmpty(),
    check('link', 'Link is required').not().isEmpty(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, subject, section, problem, link, user, errors, question, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, subject = _a.subject, section = _a.section, problem = _a.problem, link = _a.link;
                return [4 /*yield*/, User.findById(res.locals.user.id).select('-password')];
            case 1:
                user = _b.sent();
                errors = validationResult(req);
                if (!errors.isEmpty()) return [3 /*break*/, 6];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                question = new Question({
                    user: res.locals.user.id,
                    userName: user.name,
                    subject: subject,
                    section: section,
                    problem: problem,
                    link: link,
                    comment: [],
                });
                return [4 /*yield*/, question.save()];
            case 3:
                _b.sent();
                // res.send(question);
                res.send(question);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error(err_1.message);
                res.status(500).send('server error');
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
            case 7: return [2 /*return*/];
        }
    });
}); });
//get api/questions/:id
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var question, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Question.find({ user: req.params.id })];
            case 1:
                question = _a.sent();
                console.log('hereinise te request');
                res.send(question);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2.message);
                res.status(500).send('server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//get all questions
//api/questions
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var question, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Question.find()];
            case 1:
                question = _a.sent();
                res.send(question);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3.message);
                res.status(500).send('server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// router.post('/comment/:id', auth, async (req, res) => {
// 	const content = req.body.content;
// 	try {
// 		let user = await User.findById(res.locals.user.id).select('-password');
// 		let question = await Question.findById(req.params.id);
// 		let comment = {
// 			user: user.id,
// 			content,
// 		};
// 		question.comments.unshift(comment);
// 		await question.save();
// 		res.send(comment);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('server error');
// 	}
// });
//questions/comment/:id
router.post('/comment/:id', auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var thiscomment, upvt, upvote, newval, newval, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, Comment.findById(req.params.id)];
            case 1:
                thiscomment = _a.sent();
                return [4 /*yield*/, Upvote.findOne({ comment: thiscomment })];
            case 2:
                upvt = _a.sent();
                if (!!upvt) return [3 /*break*/, 5];
                upvote = new Upvote({
                    comment: thiscomment.id,
                });
                upvote.upvoters.unshift({ user: res.locals.user.id });
                return [4 /*yield*/, upvote.save()];
            case 3:
                _a.sent();
                newval = thiscomment.value + 1;
                thiscomment.value = newval;
                return [4 /*yield*/, thiscomment.save()];
            case 4:
                _a.sent();
                res.send(thiscomment);
                return [3 /*break*/, 8];
            case 5:
                upvt.upvoters.unshift({ user: res.locals.user.id });
                return [4 /*yield*/, upvt.save()];
            case 6:
                _a.sent();
                newval = thiscomment.value + 1;
                thiscomment.value = newval;
                return [4 /*yield*/, thiscomment.save()];
            case 7:
                _a.sent();
                res.send(thiscomment);
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                err_4 = _a.sent();
                res.status(500).send('server error');
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
//get questions/comment/upvotes/id:
// router.get('/comment/upvote/:id', auth, async (req, res) => {
// 	try {
// 		let upvote = await Upvote.find({ comment: req.params.id });
// 		res.send(upvote);
// 	} catch (err) {
// 		res.status(500).send('server error');
// 	}
// });
//post api/questions/:id(comment)
router.post('/:id', auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content, userName, question, comment, allcomment, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                console.log(content);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, User.findById(res.locals.user.id).select('-password')];
            case 2:
                userName = _a.sent();
                return [4 /*yield*/, Question.findById(req.params.id)];
            case 3:
                question = _a.sent();
                comment = new Comment({
                    user: res.locals.user.id,
                    name: userName.name,
                    question: question.id,
                    content: content,
                    value: 0,
                });
                return [4 /*yield*/, comment.save()];
            case 4:
                _a.sent();
                question.comments.unshift({ comment: comment.id });
                return [4 /*yield*/, question.save()];
            case 5:
                _a.sent();
                return [4 /*yield*/, Comment.find({ question: question._id })];
            case 6:
                allcomment = _a.sent();
                res.send(allcomment);
                return [3 /*break*/, 8];
            case 7:
                err_5 = _a.sent();
                res.status(500).send('server error');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
//get api/comment/questions/:id
router.get('/comment/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Comment.find({ question: req.params.id })];
            case 1:
                comment = _a.sent();
                res.send(comment);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(500).send('server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//delete api/question/:id
router.delete('/:id', auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, question, aferDeleted, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, User.findById(res.locals.user.id).select('-password')];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Question.findById(req.params.id)];
            case 2:
                question = _a.sent();
                if (!(question.user == user.id)) return [3 /*break*/, 5];
                return [4 /*yield*/, question.remove()];
            case 3:
                _a.sent();
                return [4 /*yield*/, Question.find({ user: res.locals.user.id })];
            case 4:
                aferDeleted = _a.sent();
                res.send(aferDeleted);
                return [3 /*break*/, 6];
            case 5:
                res.json({ msg: 'You are not authorized to delete it' });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_7 = _a.sent();
                console.error(err_7.message);
                res.status(500).send('server error');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
module.exports = router;

/**
 * @api {get} /scheme/:id Request Scheme information
 * @apiName GetScheme
 * @apiGroup Scheme
 *
 * @apiParam {Number} id Scheme unique ID.
 *
 * @apiSuccess {String} _id ID of the Department* 
 * @apiSuccess {String} name Name of the Department
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "_id": "596726c44138fe0cbb922f5a",
 *          "name": "Existence of independent internal committee comprising of academic, non-academic staff and students to administer University scholarships/bursaries/grants etc.",
 *          "score": 2,
 *          "updatedAt": "2017-07-13T07:52:36.449Z",
 *          "createdAt": "2017-07-13T07:52:36.449Z",
 *          "__v": 0
 *      }
 *
 * @apiError NotFound No record found for id '596726c44138ef0cbb922f5a'".
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *      "name": "NotFound",
 *      "message": "No record found for id '596726c44138ef0cbb922f5a'",
 *      "code": 404,
 *      "className": "not-found",
 *      "errors": {}
 *     }
 */


/**
 * @api {post} /scheme Create Scheme 
 * @apiName CreateScheme
 * @apiGroup Scheme
 *
 * @apiParam {String} id Scheme unique ID.
 * @apiParam {String} name Antidote name
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
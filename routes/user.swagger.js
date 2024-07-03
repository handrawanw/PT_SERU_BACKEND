
// user.js

/**
 * @swagger
 * swagger: "2.0"
 * info:
 *   title: Account API
 *   description: Account API for managing Account
 *   version: "1.0.0"
 *
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 * 
 * tags:
 *   - name: Account
 *     description: The Account managing APIs
 *
 * paths:
 *   /user/login:
 *     post:
 *       summary: Login
 *       tags: [Account]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "admin"
 *                 password:
 *                   type: string
 *                   example: "admin#@!"
 *       responses:
 *         200:
 *           description: Login Account response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/LoginResponseSuccess'
 * 
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: "4000"
 *                   message:
 *                     type: string
 *                     example: "You must fill all the field"
 * 
 *         401:
 *           description: Unauthorized
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: string
 *                  example: "4010"
 *                message:
 *                  type: string
 *                  example: "Username or Password not match! | Password and Username not match!"
 * 
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                 code:
 *                   type: string
 *                   example: "5000"
 *                 message:
 *                   type: string
 *                   example: "Ops... Internal server error, please contact support" 
 *
 * 
 * definitions:
 *   LoginResponseSuccess:
 *     type: object
 *     properties:
 *       code:
 *         type: string
 *         example: "2000"
 *       access_token:
 *         type: string
 *         example: "eyJhbsciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 *       token_type:
 *         type: string
 *         example: "bearer"
 */

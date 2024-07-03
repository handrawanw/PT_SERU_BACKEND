
// pricelist.js

/**
 * @openapi
 * /api/pricelist:
 *      get:
 *          tags: [PriceList]
 *          security:
 *              - bearerAuth: []
 *          description: Get the list of Names with optional filter
 *          parameters:
 *              - in: query
 *                name: page
 *                schema:
 *                  type: string
 *                  default: 1
 *                description: Optional page parameter
 *              - in: query
 *                name: limit
 *                schema:
 *                  type: string
 *                  default: 10
 *                description: Optional limit parameter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              additionalData:
 *                                  type: string
 *                                  description: Additional data in the request body
 *          responses:
 *               200:
 *                    description: list of Names
 *               500:
 *                    description: Some Server Error
 *               401:
 *                    description: UnAuthorized Access. Kindly check Bearer Token
 */


/**
 * @openapi
 * /api/pricelist/{id}:
 *      get:
 *          tags: [PriceList]
 *          security:
 *              - bearerAuth: []
 *          description: Get the Price List with optional pagination and additional data
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the price list
 *              - in: query
 *                name: page
 *                schema:
 *                  type: integer
 *                  default: 1
 *                description: Optional page number for pagination
 *              - in: query
 *                name: limit
 *                schema:
 *                  type: integer
 *                  default: 10
 *                description: Optional limit per page for pagination
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              additionalData:
 *                                  type: string
 *                                  description: Additional data in the request body
 *          responses:
 *               200:
 *                    description: Successful response
 *                    content:
 *                      application/json:
 *                        schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                   type: integer
 *                                   example: 200
 *                              message:
 *                                   type: string
 *                                   example: "Price List fetched successfully"
 *                              pagination:
 *                                   type: object
 *                                   properties:
 *                                      page:
 *                                          type: integer
 *                                          example: 1
 *                                      limit:
 *                                          type: integer
 *                                          example: 10
 *                              data:
 *                                   type: array
 *                                   example: [{"id":1,"name":"Price List 1","price":1000}]
 *               500:
 *                    description: Some Server Error
 *               401:
 *                    description: Unauthorized Access. Kindly check Bearer Token
 */


import swaggerJsdoc from 'swagger-jsdoc';
import {version}  from '../../package.json';

const options: swaggerJsdoc.Options = {
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title:"Nawah api",
            description: "Ecommerce date api App",
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT"
            },
            version
        },
        servers:[
            {
                url:"http://localhost:3001/api/v2"
            }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:'bearer',
                    bearerFormat:"JWT",
                    in:"header",
                    name:"authorization"
                }
            }
        },
        consumes: [
                "application/json"
        ],
        produces: [
                "application/json"
        ],
        paths:{
            "/auth/register": {
                post: {
                    summary: "Register a new user",
                    tags: ["Authantication"],
                    description: "Register a new user with the given email and password",
                    
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname:{
                                            type: "string",
                                            description: "The user's first name"
                                        },
                                        lname:{
                                            type: "string",
                                            description: "The user's last name"
                                        },
                                        email:{
                                            type: "string",
                                            format: "email",
                                            description: "The user's email address"
                                        },
                                        password:{
                                            type: "string",
                                            format: "password",
                                            description: "The user's password"
                                        },
                                        role:{
                                            type: "string",
                                            default:"user",
                                            example:"user",
                                            enum: ["user", "engineer", "farmer","admin"],
                                            description: "The user's role"
                                        }
                                    },
                                    required: ["email", "password","fname","lname"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "User created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/auth/login": {
                post: {
                    summary: "User Login",
                    tags: ["Authantication"],
                    description: "Authenticate user and generate a token",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email:{
                                            type: "string",
                                            format: "email",
                                            description: "The user's email address"
                                        },
                                        password:{
                                            type: "string",
                                            format: "password",
                                            description: "The user's password"
                                        } 
                                    },
                                    required: ["email", "password"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "Successful login",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:401
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            /************************************************************/
            /**========================== product docs===================== */
            "/product/": {
                post: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    summary: "Create a new product.",
                    tags: ["Product"],
                    description: "Create a new product",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name:{
                                            type: String,
                                        },
                                        description: {
                                            type: String,
                                        },
                                        price: {
                                            type: Number,
                                        },
                                        imageUrl:{
                                            type:"file",
                                        },
                                        category: {
                                            type: String,
                                            enum: ['dates','fertilizer', 'palm'],
                                            default: 'dates'
                                        },
                                        quantity:{
                                            type:Number 
                                        },
                                        status: {
                                            type: String,
                                            default: "pending",
                                            enum: {
                                                values: ['available','out of order','pending'],
                                            },
                                        },
                                        farmerId: {
                                            type:String
                                        },
                                        rates:{
                                            type: Number 
                                        }
                                    },
                                    required: ["name", "description","price","category","quantity"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "Product created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get:{
                    summary: "Get a list of products.",
                    tags: ["Product"],
                    description: "Get a list of products",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Product created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/product/{id}":{
                get:{
                    summary: "Get a product.",
                    tags: ["Product"],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    description: "Get a product by id",
                    responses: {
                        "200": {
                            description: "Product got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete:{
                    summary: "Delete a product.",
                    tags: ["Product"],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    description: "Delete a product by id",
                    responses: {
                        "200": {
                            description: "Product deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    summary: "Edit a product.",
                    tags: ["Product"],
                    description: "Edit a product by id",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name:{
                                            type: String,
                                        },
                                        description: {
                                            type: String,
                                        },
                                        price: {
                                            type: Number,
                                        },
                                        imageUrl:{
                                            type:"file",
                                        },
                                        category: {
                                            type: String,
                                            enum: ['dates','fertilizer', 'palm'],
                                            default: 'dates'
                                        },
                                        quantity:{
                                            type:Number 
                                        },
                                        status: {
                                            type: String,
                                            default: "pending",
                                            enum: {
                                                values: ['available','out of order','pending'],
                                            },
                                        },
                                        farmerId: {
                                            type:String
                                        },
                                        rates:{
                                            type: Number 
                                        }
                                    },
                                    required: ["name", "description","price","category","quantity"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Product edited successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },
            /************************************************************/
            /**========================== user docs===================== */
            "/user/": {
                post: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    summary: "Create a new user.",
                    tags: ["User"],
                    description: "Create a new user with the given email and password",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname:{
                                            type: String,
                                            description: "The user's first name"
                                        },
                                        lname:{
                                            type: String,
                                            description: "The user's last name"
                                        },
                                        email:{
                                            type: String,
                                            format: "email",
                                            description: "The user's email address"
                                        },
                                        password:{
                                            type: String,
                                            format: "password",
                                            description: "The user's password"
                                        },
                                        phone:{
                                            type:"number"
                                        },
                                        address: {
                                            type: String,
                                        },
                                        img:{
                                            type:"file",
                                            default:"avatar.jfif",
                                        },
                                        role:{
                                            type: String,
                                            default:"user",
                                            example:"user",
                                            enum: ["user", "engineer", "farmer","admin"],
                                            description: "The user's role"
                                        }
                                    },
                                    required: ["email", "password","fname","lname"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "User created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get:{
                    summary: "Get a list of users.",
                    tags: ["User"],
                    description: "Get a list of users",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    responses: {
                        "200": {
                            description: "User created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/user/{id}":{
                get:{
                    summary: "Get a user.",
                    tags: ["User"],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    description: "Get a user by id",
                    responses: {
                        "200": {
                            description: "User got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete:{
                    summary: "Delete a user.",
                    tags: ["User"],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    description: "Delete a user by id",
                    responses: {
                        "200": {
                            description: "User deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    summary: "Edit a user.",
                    tags: ["User"],
                    description: "Edit a user by id",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname:{
                                            type: String,
                                            description: "The user's first name"
                                        },
                                        lname:{
                                            type: String,
                                            description: "The user's last name"
                                        },
                                        email:{
                                            type: String,
                                            format: "email",
                                            description: "The user's email address"
                                        },
                                        password:{
                                            type: String,
                                            format: "password",
                                            description: "The user's password"
                                        },
                                        phone:{
                                            type:"number"
                                        },
                                        address: {
                                            type: String,
                                        },
                                        img:{
                                            type:"file",
                                            default:"avatar.jfif",
                                        },
                                        role:{
                                            type: String,
                                            default:"user",
                                            example:"user",
                                            enum: ["user", "engineer", "farmer","admin"],
                                            description: "The user's role"
                                        }
                                    },
                                    required: ["email", "password","fname","lname"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "User edited successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },

            /*********************************************************/
            /**=========================farmer docs =================== */
            "/farmer/": {
                post: {
                    summary: "Create a new farmer.",
                    tags: ["Farmer"],
                    description: "Create a new farmer with the given email and password",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname:{
                                            type: "string",
                                            description: "The farmer's first name"
                                        },
                                        lname:{
                                            type: "string",
                                            description: "The farmer's last name"
                                        },
                                        email:{
                                            type: "string",
                                            format: "email",
                                            description: "The farmer's email address"
                                        },
                                        password:{
                                            type: "string",
                                            format: "password",
                                            description: "The farmer's password"
                                        },
                                        role:{
                                            type: "string",
                                            default:"farmer",
                                            example:"farmer",
                                            enum: ["user", "engineer", "farmer","admin"],
                                            description: "The farmer's role"
                                        }
                                    },
                                    required: ["email", "password","fname","lname"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "User created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get:{
                    summary: "Get a list of farmers.",
                    tags: ["Farmer"],
                    description: "Get a list of farmers",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Farmers got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/farmer/{id}":{
                get:{
                    summary: "Get a farmer.",
                    tags: ["Farmer"],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    description: "Get a farmer by id",
                    responses: {
                        "201": {
                            description: "Farmer got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete:{
                    summary: "Delete a farmer.",
                    tags: ["Farmer"],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    description: "Delete a farmer by id",
                    responses: {
                        "200": {
                            description: "Farmer deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    summary: "Edit a farmer.",
                    tags: ["Farmer"],
                    description: "Edit a farmer by id",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname:{
                                            type: String,
                                            description: "The farmer's first name"
                                        },
                                        lname:{
                                            type: String,
                                            description: "The farmer's last name"
                                        },
                                        email:{
                                            type: String,
                                            format: "email",
                                            description: "The farmer's email address"
                                        },
                                        password:{
                                            type: String,
                                            format: "password",
                                            description: "The farmer's password"
                                        },
                                        phone:{
                                            type:"number"
                                        },
                                        address: {
                                            type: String,
                                        },
                                        img:{
                                            type:"file",
                                            default:"avatar.jfif",
                                        },
                                        role:{
                                            type: String,
                                            default:"farmer",
                                            example:"farmer",
                                            enum: ["user", "engineer", "farmer","admin"],
                                            description: "The farmer's role"
                                        }
                                    },
                                    required: ["email", "password","fname","lname"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "User edited successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "/farmer/addNote":{
                put: {
                    summary: "Add a note to  a farmer.",
                    tags: ["Farmer"],
                    description: " Engineer add a note to  a farmer",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                            productId:{
                                                type:String,
                                            },
                                            farmerId:{
                                                type:String,
                                            },
                                            note:{
                                                type:String,
                                            },
                                    },
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "User created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },

            /**********************************************************/
            /**=======================engineer docs=================== */
            "/engineer/": {
                post: {
                    summary: "Create a new engineer.",
                    tags: ["Engineer"],
                    description: "Create a new engineer with the given email and password",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname:{
                                            type: "string",
                                            description: "The engineer's first name"
                                        },
                                        lname:{
                                            type: "string",
                                            description: "The engineer's last name"
                                        },
                                        email:{
                                            type: "string",
                                            format: "email",
                                            description: "The engineer's email address"
                                        },
                                        password:{
                                            type: "string",
                                            format: "password",
                                            description: "The engineer's password"
                                        },
                                        role:{
                                            type: "string",
                                            default:"engineer",
                                            example:"engineer",
                                            enum: ["user", "engineer", "farmer","admin"],
                                            description: "The engineer's role"
                                        }
                                    },
                                    required: ["email", "password","fname","lname"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "Engineer created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get:{
                    summary: "Get a list of engineers.",
                    tags: ["Engineer"],
                    description: "Get a list of engineers",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Engineers got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                            token:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/engineer/{id}":{
                get:{
                    summary: "Get a engineer.",
                    tags: ["Engineer"],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    description: "Get a engineer by id",
                    responses: {
                        "201": {
                            description: "Engineer got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete:{
                    summary: "Delete a engineer.",
                    tags: ["Engineer"],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    description: "Delete a engineer by id",
                    responses: {
                        "200": {
                            description: "Engineer deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    summary: "Edit a engineer.",
                    tags: ["Engineer"],
                    description: "Edit a engineer by id",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname:{
                                            type: String,
                                            description: "The engineer's first name"
                                        },
                                        lname:{
                                            type: String,
                                            description: "The engineer's last name"
                                        },
                                        email:{
                                            type: String,
                                            format: "email",
                                            description: "The engineer's email address"
                                        },
                                        password:{
                                            type: String,
                                            format: "password",
                                            description: "The engineer's password"
                                        },
                                        phone:{
                                            type:"number"
                                        },
                                        address: {
                                            type: String,
                                        },
                                        img:{
                                            type:"file",
                                            default:"avatar.jfif",
                                        },
                                        role:{
                                            type: String,
                                            default:"engineer",
                                            example:"engineer",
                                            enum: ["user", "engineer", "farmer","admin"],
                                            description: "The engineer's role"
                                        }
                                    },
                                    required: ["email", "password","fname","lname"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "User edited successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "/engineer/addfarmer/{id}":{
                put: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    summary: "Add farmers to a engineer.",
                    tags: ["Engineer"],
                    description: "Add farmers to a engineer",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        engineerId:{
                                            type:String
                                        },
                                        farmers:{
                                            type:Array
                                        }
                                    },
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Farmer added successfully to the engineer",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },

            /********************************************************/
            /**======================contact message docs=============== */
            "/contactMessg/": {
                post: {
                    summary: "Create a Contact Message.",
                    tags: ["Contact Message"],
                    description: "Create a new Create a Contact Message",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email:{
                                            type: "string",
                                            format: "email",
                                            description: "The engineer's email address"
                                        },
                                        contactMessage:{
                                            type:String,
                                        }
                                        
                                    },
                                    required: ["email", "contactMessage"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "Engineer created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get:{
                    summary: "Get a list of Contact Messages.",
                    tags: ["Contact Message"],
                    description: "Get a list of Contact Messages",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Contact Messages got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            /********************************************************/
            /**======================order docs=============== */
            "/order/": {
                post: {
                    summary: "Create a new order.",
                    tags: ["Order"],
                    description: "Create a new order with the given cart items, shipping fee, and tax",
                    security:[
                    {
                        bearerAuth:[],
                    }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        items: {
                                            type: "array",
                                                items: {
                                                type: "object",
                                                    properties: {
                                                        productId: {
                                                            type: "string",
                                                            description: "The product ID"
                                                        },
                                                        name:{
                                                            type:"string"
                                                        },
                                                        amount: {
                                                            type: "number",
                                                            description: "The quantity of the product"
                                                        },
                                                        price:{
                                                            type:"number"
                                                        }
                                                    },
                                                    required: ["productId", "amount"]
                                                }
                                        },
                                        shippingFee: {
                                            type: "number",
                                            description: "The shipping fee"
                                        },
                                        tax: {
                                            type: "number",
                                            description: "The tax"
                                        },
                                        paymentIntentId: {
                                            type: "string",
                                        },
                                        clientSecret: {
                                            type: "string",
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    required: ["items", "shippingFee", "tax"]
                                }
                            }
                        }
                    },
                    responses: {
                    "201": {
                        description: "Order created successfully",
                        content: {
                        "application/json": {
                            schema: {
                            type: "object",
                            properties: {
                                success: {
                                type: "boolean"
                                },
                                data: {
                                type: "object"
                                },
                                message: {
                                type: "string"
                                }
                            }
                            }
                        }
                        }
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                        "application/json": {
                            schema: {
                            type: "object",
                            properties: {
                                success: {
                                type: "boolean",
                                default: false
                                },
                                data: {
                                type: "object",
                                default: null
                                },
                                message: {
                                type: "string"
                                },
                                statusCode: {
                                type: "number",
                                default: 400
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                },
                get:{
                    summary: "Get a list of orders.",
                    tags: ["Order"],
                    description: "Get a list of orders",
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Orders got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/order/{id}":{
                get:{
                    summary: "Get an Order By Id.",
                    tags: ["Order"],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    description: "Get an Order By Id.",
                    responses: {
                        "200": {
                            description: "Order got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete:{
                    summary: "Delete an Order By Id.",
                    tags: ["Order"],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    description: "Delete an Order By Id",
                    responses: {
                        "200": {
                            description: "Order deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    summary: "Edit an Order By Id.",
                    tags: ["Order"],
                    description: "Edit an Order By Id",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status:{
                                            type: String,
                                        },
                                        clientSecret: {
                                            type: String,
                                        },
                                        paymentIntentId: {
                                            type: String,
                                        },
                                    },
                                    required: ["status", "clientSecret","paymentIntentId"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Order edited successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "/order/orderOfUser/{id}":{
                get:{
                    summary: "Get Orders Of User By Id.",
                    tags: ["Order"],
                    parameters:[{
                        in:"path",
                        name:"id",
                        required: true,
                        schema:{
                            type: String
                        }
                    }],
                    security:[
                        {
                            bearerAuth:[],
                        }
                    ],
                    description: "Get Orders Of User By Id",
                    responses: {
                        "200": {
                            description: "Orders Of User got successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean"
                                            },
                                            data:{
                                                type: "object"
                                            },
                                            message:{
                                                type: "string"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success:{
                                                type: "boolean",
                                                default:false
                                            },
                                            data:{
                                                type:"object",
                                                default:null
                                            }
                                            ,
                                            message:{
                                                type: "string"
                                            },
                                            statusCode:{
                                                type: "number",
                                                default:400
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },

            
            /********************************************************/
            /**======================stripe docs=============== */
            "/stripe/":{
                post: {
                    summary: "Create a PaymentIntent.",
                    tags: ["Stripe"],
                    description: "Create a  PaymentIntent with the given paymentMethodId, total amount of order",
                    security:[
                    {
                        bearerAuth:[],
                    }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        total: {
                                            type: "number",
                                            description: "The total amount of order"
                                        },
                                        paymentMethod: {
                                            type: "object",
                                        },
                                    },
                                    required: ["total", "paymentMethod"]
                                }
                            }
                        }
                    },
                    responses: {
                    "201": {
                        description: "payment created successfully",
                        content: {
                        "application/json": {
                            schema: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean"
                                },
                                requires_action:{
                                    type: "boolean"
                                },
                                payment_intent_client_secret: {
                                    type: "string"
                                },
                                paymentIntent_id:{
                                    type: "string"
                                },
                                message: {
                                    type: "string"
                                }
                            }
                            }
                        }
                        }
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                        "application/json": {
                            schema: {
                            type: "object",
                            properties: {
                                success: {
                                type: "boolean",
                                default: false
                                },
                                data: {
                                type: "object",
                                default: null
                                },
                                message: {
                                type: "string"
                                },
                                statusCode: {
                                type: "number",
                                default: 400
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                },
            }

        }
    
    },
    apis:['../routes/*.ts','../models/*.ts']
}

const swaggerDocument = swaggerJsdoc(options);
export default swaggerDocument;




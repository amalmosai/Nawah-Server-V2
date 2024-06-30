import express, {Request,Response,Application,} from 'express';
import config from './config';
import http from 'http';
import path from 'path';
import bodyParser from "body-parser";
import cors from "cors";
// import cookieParser from "cookie-parser";
import errorhandler from '../src/middlewares/errorhandler';
const app = express();
const server = http.createServer(app);
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import farmerRoute from './routes/farmerRoute';
import engineerRoute from './routes/engineerRoute';
import productRoute from './routes/productRoute';
import contactRoute from './routes/contactRoute';
import orderRoute from './routes/orderRoute';
import stripeRoute from './routes/stripeRoute';
import swaggerDocument from './utils/swagger';
import  swaggerUi  from "swagger-ui-express";


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use((express.json({ limit: "30mb"})));
app.use((express.urlencoded({ limit: "30mb", extended: true})));
app.use("/uploads",express.static(path.join(__dirname,'../public/uploads')));

const swaggerUiOptions = {
    swaggerOptions: {
        url: '/api-docs/swagger.json',
    },
    customSiteTitle:"Nawah Api",
    customCssUrl: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ].join(", "),
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ].join(", "),
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(
    swaggerDocument,
    swaggerUiOptions
));


app.use('/api/v2/auth',authRoute);
app.use('/api/v2/user',userRoute);
app.use('/api/v2/farmer',farmerRoute);
app.use('/api/v2/engineer',engineerRoute);
app.use('/api/v2/product',productRoute);
app.use('/api/v2/contactMessg',contactRoute);
app.use('/api/v2/order',orderRoute);
app.use('/api/v2/stripe',stripeRoute);


app.use(errorhandler);


// SETUP CONNECTION
config.connect();

app.listen(config.port, () => {
    console.log(`Nawah app listening on port ${config.port}!`);
});

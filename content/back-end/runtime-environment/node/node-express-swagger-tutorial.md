# node-express-swagger manual
1. 什麼是 Swagger？
- 在當今的軟體領域，已經從單體系統轉向微型服務，微服務許多設計都基於 REST API，已經從單體系統轉向微型服務
- Swagger 是一套基於 REST 的 API 互動文件產生器，幫助我們來自動產生 API 規格文件的好幫手 主要是讓人跟電腦都能夠理解 API 的功能和內容，而不需要閱讀程式碼。因為 Swagger 已經在 2015 捐贈給 OpenAPI，所以也會看到有人用 OpenAPI 來稱呼它。

# Operation installation process:
1. - npm install express swagger-ui-express swagger-jsdoc
2. Create Swagger configuration js file [swaggerSpec.js]
import swaggerJsdoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stocks API',
      version: '1.0.0',
      description: 'APIs for managing stocks data',
    },
    servers: [
      {
        url: 'http://localhost:9421', // your URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./controllers/**/*.js'],

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

3. Add swagger annotations to the express.Router function to automatically generate api files
const appRouter = express.Router();

/**
 * @swagger
 * /routeName:
 *   get:
 *     summary: Get client IP information
 *     description: Returns client IP information along with NordVPN data.
 *     responses:
 *       200:
 *         description: Successful response with client IP and NordVPN data.
 */
appRouter.get("/routeName", async (req, res) => {
  try {
    var ipAddress = req.ip;
    if (ipAddress == "::1" || ipAddress == "127.0.0.1") {
      const myip = await HttpClientService.getLocalPublicIpAddressAsync();
      ipAddress = myip;
    }
    const data = await HttpClientService.getNordVPNDataAsync(ipAddress);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







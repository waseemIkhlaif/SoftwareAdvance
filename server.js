const express = require('express');
const app = express();
const sequ = require('./config/db');

// controllers
const CommunityGardens = require('./Controllers/CommunityGardensController');
const user = require('./Controllers/UserController');
const KnowledgeBase = require('./Controllers/KnowledgeBaseController');
const crop = require("./Controllers/CropControllers");
const cropPlan = require("./Controllers/CropPlanController");
const Volunteer = require("./Controllers/VolunteerController");
const VolunteerActivities = require("./Controllers/VolunteerActivitiesController");
const VolunteerEvent = require("./Controllers/VolunteerEventController");
const Plot = require("./Controllers/PlotController");
const Log = require("./Controllers/LogController");
const Partner = require("./Controllers/PartnerController");
const Resource = require("./Controllers/ResourseController");
const ResourceExchange = require("./Controllers/ResourceExchangeController");
const role = require("./Controllers/roleController");
const userroles = require("./Controllers/userRoleController");
const SoilData = require("./Controllers/SoilDataController");
const WeatherData = require("./Controllers/WeatherDataController");

// json
app.use(express.json());

// api
app.use('/api/communitygardens', CommunityGardens);
app.use('/api/user', user);
app.use('/api/crop', crop);
app.use('/api/KnowledgeBase', KnowledgeBase);
app.use('/api/cropPlan', cropPlan);
app.use('/api/Volunteer', Volunteer);
app.use('/api/VolunteerActivities', VolunteerActivities);
app.use('/api/VolunteerEvent', VolunteerEvent);
app.use('/api/Plot', Plot);
app.use('/api/Log', Log);
app.use('/api/Partner', Partner);
app.use('/api/Resource', Resource);
app.use('/api/ResourceExchange', ResourceExchange);
app.use('/api/role', role);
app.use('/api/userroles', userroles);
app.use('/api/SoilData', SoilData);
app.use('/api/WeatherData', WeatherData);


sequ.sync().then(() => {
    app.listen(8000, () => {
        console.log("App running");
    })
});

import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import OurFeatures from "./OurFeatures";
import TheTopDeliveryMen from "./TheTopDeliveryMen";
import Statistics from "./Statistics";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Parcel Management App | Home</title>
            </Helmet>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <Statistics></Statistics>
            <TheTopDeliveryMen></TheTopDeliveryMen>
        </div>
    );
};

export default Home;
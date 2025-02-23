const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="glass p-6">
            <div className="flex items-center justify-center mb-4">{icon}</div>
            <h3 className="text-responsive-h4 font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
};
export default FeatureCard;

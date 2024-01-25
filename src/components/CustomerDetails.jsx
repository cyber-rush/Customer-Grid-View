import { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDetails = ({ selectedCustomer }) => {
    const [photoGrid, setPhotoGrid] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=1000');
                const photos = response.data.map((photo) => ({
                    id: photo.id,
                    urls: { small: `https://picsum.photos/id/${photo.id}/1000/800` },
                    user: { name: photo.author },
                }));
                setPhotoGrid(photos);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching photos:', error.message);
            }
        };

        const intervalId = setInterval(() => {
            // Change photos every 10 seconds
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 1000);
        }, 10000);

        // Initial fetch
        fetchPhotos();

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="w-4/5 p-4 pl-0 border mt-4 bg-gray-100">
            {selectedCustomer && (
                <div>
                    <h2 className="text-2xl text-center font-bold mb-4">
                        {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </h2>
                    <div className="flex items-center mb-2 px-4">
                        <span className="text-gray-600 font-semibold mr-2">Professional Title:</span>
                        <p>
                            {selectedCustomer.company.title}
                        </p>
                    </div>
                    <div className="flex items-center mb-2 px-4">
                        <span className="text-gray-600 font-semibold mr-2">Address:</span>
                        <p>
                            {selectedCustomer.address.address}, {selectedCustomer.address.city}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-16 px-4 ">
                        {photoGrid.slice(currentIndex, currentIndex + 9).map((photo, index) => (
                            <img
                                key={photo.id}
                                src={photo.urls.small}
                                alt={`Photo by ${photo.user.name}`}
                                className={` border rounded-lg w-full h-128 object-cover transition-opacity duration-500 ${index < 9 ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDetails;

import { useState, useEffect } from "react";
import CustomersList from "./components/CustomersList";
import CustomerDetails from "./components/CustomerDetails";

const App = () => {

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {

    const fetchCustomers = async () => {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setCustomers(data.users);
    };

    fetchCustomers();
  }, [])

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="flex">
      <CustomersList
        customers={customers}
        selectedCustomer={selectedCustomer}
        handleCustomerClick={handleCustomerClick}
      />
      {
        selectedCustomer && (
          <CustomerDetails selectedCustomer={selectedCustomer} />
        )
      }

    </div>
  )
}

export default App


const CustomersList = ({ customers, selectedCustomer, handleCustomerClick }) => {
    return (
        <div className="w-1/5 p-4 pr-0">
            <ul>
                {customers.map((customer) => (
                    <li
                        key={customer.id}
                        onClick={() => handleCustomerClick(customer)}
                        className={`cursor-pointer p-6 border ${selectedCustomer?.id === customer.id ? 'bg-gray-300 border-r-black  font-black text-white' : ''
                            }`}
                    >
                        {customer.firstName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CustomersList

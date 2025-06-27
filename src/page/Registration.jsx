import React, { useState } from 'react';
import defaultImage from '../assets/image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Registration = () => {
  const [selectedState, setSelectedState] = useState('');
  const [image, setImage] = useState(null);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    state: '',
    city: '',
    profileImage: null
  });

  // States data remains the same as your original code
  const states = [
    {
      state: "Uttar Pradesh",
      cities: [
        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Ayodhya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Faizabad (Ayodhya)",
        "Farrukhabad",
        "Firozabad",
        "Gautam Buddha Nagar (Noida)",
        "Ghaziabad",
        "Gorakhpur",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kasganj",
        "Kaushambi",
        "Kushinagar",
        "Lakhimpur Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Prayagraj (Allahabad)",
        "Rae Bareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Sant Kabir Nagar",
        "Shahjahanpur",
        "Shamli",
        "Shravasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi"
      ]
    },
    {
      state: "Maharashtra",
      cities: [
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad (Chhatrapati Sambhajinagar)",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad (Dharashiv)",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim"
      ]
    },
    {
      state: "Karnataka",
      cities: [
        "Bagalkote",
        "Ballari",
        "Belagavi",
        "Bengaluru Rural",
        "Bengaluru Urban",
        "Bidar",
        "Chamarajanagara",
        "Chikkaballapura",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Uttara Kannada",
        "Vijayapura",
        "Yadgir"
      ]
    },
    {
      state: "Gujarat",
      cities: [
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Dang",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kachchh",
        "Kheda",
        "Mahesana",
        "Mahisagar",
        "Morbi",
        "Narmada",
        "Navsari",
        "Panch Mahals",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabar Kantha",
        "Surat",
        "Surendranagar",
        "Tapi",
        "Vadodara",
        "Valsad"
      ]
    },
    {
      state: "Tamil Nadu",
      cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"]
    },
    {
      state: "delhi",
      cities: [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi"
      ]
    },
    {
      state: "Rajasthan",
      cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer"]
    },
    {
      state: "West Bengal",
      cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman"]
    },
    {
      state: "Andhra Pradesh",
      cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati"]
    }
  ];

  const navigate = useNavigate();

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setFormData({ ...formData, state: stateName, city: '' });

    const selectedStateData = states.find(state => state.state === stateName);
    setCities(selectedStateData ? selectedStateData.cities : []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic image type validation
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    // Basic image size validation (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result;
      setImage(base64Image);
      setFormData({ ...formData, profileImage: base64Image });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.name || !formData.email || !formData.password ||
      !formData.confirmPassword || !formData.gender || !formData.state ||
      !formData.city) {
      toast.error('Please fill all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify({
      ...formData,
      profileImage: image
    }));

    toast.success('Registration successful!');
    setTimeout(() => {
      navigate('/loginn');
    }, 1000);
  };

  return (
    <div className=' flex overflow-x-hidden'>
      {/* Form Section */}
      <div className='flex flex-col w-full lg:w-1/2 px-8 py-12 bg-gradient-to-b from-blue-200 via-gray-200 to-green-300'>
        <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto w-full'>
          <h1 className='text-3xl font-bold text-center underline'>Registration</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Name Fields */}
            <div className='flex flex-col'>
              <label htmlFor="name" className='font-semibold mb-1'>Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="surname" className='font-semibold mb-1'>Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Contact Fields */}
            <div className='flex flex-col'>
              <label htmlFor="email" className='font-semibold mb-1'>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="phone" className='font-semibold mb-1'>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Location Fields */}
            <div className='flex flex-col'>
              <label htmlFor="state" className='font-semibold mb-1'>State*</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleStateChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              >
                <option value="">Select a state</option>
                {states.map((state, index) => (
                  <option key={index} value={state.state}>{state.state}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="city" className='font-semibold mb-1'>City*</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                disabled={!formData.state}
                required
              >
                <option value="">Select a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Password Fields */}
            <div className='flex flex-col'>
              <label htmlFor="password" className='font-semibold mb-1'>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
                minLength="6"
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="confirmPassword" className='font-semibold mb-1'>Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className='p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
                minLength="6"
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className='mt-2'>
            <label className='font-semibold mb-2 block'>Gender*</label>
            <div className='grid grid-cols-2 gap-2'>
              {['Male', 'Female', 'Other', 'Prefer not to say'].map((gender) => (
                <label key={gender} className='flex items-center gap-2'>
                  <input
                    type="radio"
                    name="gender"
                    value={gender.toLowerCase()}
                    checked={formData.gender === gender.toLowerCase()}
                    onChange={handleChange}
                    className='h-4 w-4'
                    required
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className='mt-4'>
            <label className='font-semibold mb-2 block'>Profile Photo</label>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <img
                  src={image || defaultImage}
                  alt="Profile preview"
                  className='w-16 h-16 rounded-full object-cover border-2 border-gray-300'
                />
                {image && (
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setFormData({ ...formData, profileImage: null });
                    }}
                    className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                  >
                    ×
                  </button>
                )}
              </div>
              <div className='flex-1'>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className='hidden'
                />
                <label
                  htmlFor="profileImage"
                  className='inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
                >
                  {image ? 'Change Photo' : 'Upload Photo'}
                </label>
                <p className='text-xs text-gray-500 mt-1'>JPEG, PNG (Max 2MB)</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium'
          >
            Register
          </button>

          {/* Login Link */}
          <p className='text-center mt-4'>
            Already have an account?{' '}
            <Link to="/login" className='text-blue-600 hover:underline'>
              Login here
            </Link>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={ defaultImage}
          alt="Registration background"
          className="w-full h-[130vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
            <p className="text-lg">Create your account to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
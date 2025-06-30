import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import toast from "react-hot-toast";

const View1 = () => {
  const { state } = useLocation();
  const ele = state?.ele;
  const [viewreview, setViewReview] = useState(true);
  const navigate = useNavigate();

  const mockComments = [
    {
        id: 1,
        user: { username: "FoodLover123" },
        body: "This meal was absolutely delicious! Highly recommend.",
        likes: 24
    },
    {
        id: 2,
        user: { username: "ChefMaster" },
        body: "Great recipe, easy to follow instructions.",
        likes: 15
    },
    {
        id: 3,
        user: { username: "HomeCook22" },
        body: "Made this for my family and everyone loved it! Will definitely make again.",
        likes: 32
    },
    {
        id: 4,
        user: { username: "FlavorExplorer" },
        body: "The combination of spices is perfect. Added a bit extra chili for more heat.",
        likes: 18
    },
    {
        id: 5,
        user: { username: "MealPrepQueen" },
        body: "Excellent for weekly meal prep. Reheats well and stays flavorful.",
        likes: 27
    },
    {
        id: 6,
        user: { username: "HealthyEater" },
        body: "Substituted some ingredients to make it vegan and it still turned out amazing!",
        likes: 12
    },
    {
        id: 7,
        user: { username: "CookingNewbie" },
        body: "First time trying this recipe and it was foolproof. Even I couldn't mess it up!",
        likes: 45
    },
    {
        id: 8,
        user: { username: "FoodCritic101" },
        body: "Good base recipe. I'd recommend adding a bit more salt and reducing cook time by 5 minutes.",
        likes: 8
    },
    {
        id: 9,
        user: { username: "GlobalTastes" },
        body: "Reminds me of the authentic version I had when traveling. Nostalgic flavors!",
        likes: 21
    },
    {
        id: 10,
        user: { username: "BudgetChef" },
        body: "Affordable ingredients that make a restaurant-quality dish. Great value!",
        likes: 36
    },
    {
        id: 11,
        user: { username: "LeftoverWizard" },
        body: "Tastes even better the next day. Made a double batch for leftovers.",
        likes: 19
    },
    {
        id: 12,
        user: { username: "DietFriendly" },
        body: "Worked perfectly with my keto diet after a few simple substitutions.",
        likes: 14
    }
];
  const handleOrder = () => {
    toast.error(
 "Thank you for your interest! Unfortunately, we don't deliver to your location yet, but we truly appreciate you thinking of us."
   , {
    duration: 6000,
  }
);
     navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 mt-19">
      {ele ? (
        <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={ele.strMealThumb}
                alt={ele.strMeal}
                className="w-full h-fit object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {ele.strMeal}
              </h1><p>ready in ⏱️ 30 min</p>
              
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="text-gray-600 ml-1 text-xl">
                  4.5 (24 reviews)
                </span>
              </div>
              <div className="mb-5   ">
                <h2 className="text-xl font-semibold text-gray-700 mb-2  sticky">
                  Ingredients:
                </h2>
                <ul className="list-disc list-inside h-50 overflow-y-scroll ">
                  {Array.from({ length: 20 }, (_, i) => {
                    const num = i + 1;
                    const ingredient = ele[`strIngredient${num}`];
                    const measure = ele[`strMeasure${num}`];
                    return ingredient?.trim() ? (
                      <li key={num} className="text-gray-600">
                        {ingredient}
                        {measure?.trim() && ` (${measure.trim()})`}
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2 sticky">
                  Instructions:
                </h2>
                <div className="mb-5 h-50 overflow-y-scroll">
                  <ol className="list-decimal list-inside">
                    {ele.strInstructions
                      .split("\n")
                      .filter((step) => step.trim())
                      .map((step, i) => (
                        <li key={i} className="text-gray-600 mb-1">
                          {step}
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-yellow-600">
                  ₹ {(ele.idMeal / 300).toFixed(2)}
                </span>
                <button
                  onClick={handleOrder}
                  className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
          {/* review section */}
          <h1 className="text-center text-2xl font-bold italic underline bg-blue-300">
            customer review
          </h1>
          {viewreview && (
            <div className="space-y-2 p-8 h-80 overflow-y-scroll">
              {mockComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border shadow-2xl shadow-gray-700 mt-5 p-2 rounded"
                >
                  <div>
                    <p className="font-medium">
                      User:{" "}
                      <span className="text-gray-600">
                        {comment.user.username}
                      </span>
                    </p>
                    <p className="text-sm">{comment.body}</p>
                  </div>
                  <span className="flex items-center">
                    {comment.likes}
                    <IoIosHeart className="ml-1" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600 flex flex-col items-center justify-center min-h-[50vh]">
          No food item selected. Please go back to the menu and select an item.
          <Link
            to="/"
            className="bg-red-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-700 transition-colors"
          >
            Go to Home Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default View1;

import React, { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [hover, setHover] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle rating change
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  // Handle category selection
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    // Gather feedback data from form fields
    const feedbackData = {
      fullName: form.fullName.value,
      emailAddress: form.emailAddress.value,
      feedbackMessage: form.feedbackMessage.value,
      rating,
      category,
    };

    try {
      // Send feedback data to the backend
      const response = await fetch('http://localhost:3000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      // Handle response
      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        setError('');
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Failed to submit feedback.');
        setSuccessMessage('');
      }
    } catch (error) {
      setError('An error occurred while submitting feedback.');
      console.error('Submit feedback error:', error);
    }

    // Reset form and state after submission
    form.reset();
    setRating(0);
    setCategory('');
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Feedback Form</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
                  {/* Success Message */}
                  {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <span className="block sm:inline">{successMessage}</span>
                    </div>
                  )}

                  {/* Feedback Category */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="category">
                      Feedback Category
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray-100 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary cursor-pointer"
                      name="category"
                      id="category"
                      value={category}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="somethingnotright">Something is not right</option>
                      <option value="compliment">Compliment</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                      Your Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray-100 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="emailAddress">
                      Email Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray-100 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Feedback Message */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="feedbackMessage">
                      Feedback Message
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray-100 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="feedbackMessage"
                      id="feedbackMessage"
                      rows={6}
                      placeholder="Write your feedback here"
                      required
                    ></textarea>
                  </div>

                  {/* Rating */}
                  <div className="mb-5.5 flex items-center gap-1.5">
                    <div className="w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="rating">
                        Rate your overall experience
                      </label>
                      <div className="flex gap-1 items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <svg
                            key={value}
                            className={`h-12 w-12 cursor-pointer transition-colors duration-200 ${
                              (hover || rating) >= value ? 'text-yellow-400' : 'text-gray-400'
                            }`}
                            onClick={() => handleRatingChange(value)}
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(0)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit and Reset Buttons */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2"></div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Feedback;

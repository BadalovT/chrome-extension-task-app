function getProductData() {
    try {
        const getTrimmedText = (selector) => document.querySelector(selector)?.textContent?.trim();
        const getAttribute = (selector, attribute) => document.querySelector(selector)?.[attribute];

        const sellerElement = document.querySelector('#sellerProfileTriggerId');
        const platformRatingElement = document.querySelector('.a-icon-star .a-icon-alt');

        return {
            in_platform_id: getAttribute('[data-asin]', 'data-asin'),
            title: getTrimmedText('#productTitle'),
            platform_rating: getTrimmedText('.a-icon-star .a-icon-alt'),
            img: getAttribute('.imgTagWrapper img', 'src'),
            reviews_count: getTrimmedText('#acrCustomerReviewText'),
            price: getTrimmedText('.a-price .a-offscreen'),
            seller: sellerElement && {
                in_platform_id: getAttribute('#sellerProfileTriggerId', 'href'),
                name: sellerElement.textContent?.trim(),
                profile_url: sellerElement.href,
            },
            url: window.location.href,
            reviews: Array.from(document.querySelectorAll('.a-section.review')).map((review) => {
                const {
                    id,
                    textContent: reviewText,
                    href: authorInPlatformId,
                } = review.querySelector('.a-section.review .a-profile') || {};

                const platformRating = review.querySelector('.a-section.review .a-icon-alt')?.textContent?.trim();

                return {
                    in_platform_id: review.id,
                    review_text: review.querySelector('.a-section.review .review-text')?.textContent?.trim(),
                    is_recommended: platformRating ? parseFloat(platformRating) > 3 : false,
                    platform_rating: platformRating,
                    author: {
                        in_platform_id: authorInPlatformId,
                        full_name: review.querySelector('.a-section.review .a-profile .a-profile-name')?.textContent?.trim(),
                        profile_url: authorInPlatformId,
                    },
                };
            }),
        };
    } catch (error) {
        console.error('Error while scraping product data:', error);
        return null;
    }
}

function displayData(data) {
    if (data) {
        console.log(JSON.stringify(data, null, 2));
    } else {
        console.error('Failed to scrape product data.');
    }
}

const productData = getProductData();
displayData(productData);


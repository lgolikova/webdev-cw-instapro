import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { getToken } from "../index.js";

export function renderUserPostsPageComponent({ appEl, userId }) {
    const token = getToken();

    fetch(
        `https://wedev-api.sky.pro/api/v1/lgolikova/instapro/user-posts/${userId}`,
        {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при получении постов пользователя");
            }
            return response.json();
        })
        .then((data) => {
            const posts = data.posts;

            const postsHtml = posts
                .map((post) => {
                    const createdAt = new Date(post.createdAt);
                    const dateString = createdAt.toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                        year: "numeric",
                    });

                    return `
                        <li class="post">
                            <div class="post-header" data-user-id="${
                                post.user.id
                            }">
                                <img src="${
                                    post.user.imageUrl
                                }" class="post-header__user-image">
                                <p class="post-header__user-name">${
                                    post.user.name
                                }</p>
                            </div>
                            <div class="post-image-container">
                                <img class="post-image" src="${post.imageUrl}">
                            </div>
                            <div class="post-likes">
                                <button data-post-id="${
                                    post.id
                                }" class="like-button">
                                <img src="./assets/images/${
                                    post.isLiked
                                        ? "like-active.svg"
                                        : "like-not-active.svg"
                                }">
                                </button>
                                <p class="post-likes-text">
                                Нравится: <strong>${post.likes.length}</strong>
                                </p>
                            </div>
                            <p class="post-text">
                                <span class="user-name">${post.user.name}</span>
                                ${post.description}
                            </p>
                            <p class="post-date">
                                ${dateString}
                            </p>
                        </li>
                    `;
                })
                .join("");

            // console.log("Актуальный список постов:", posts);

            appEl.innerHTML = `
                <div class="page-container">
                    <div class="header-container"></div>
                    <ul class="posts">
                        ${postsHtml}
                    </ul>
                </div>
            `;

            /**
             * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
             * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
             */

            renderHeaderComponent({
                element: document.querySelector(".header-container"),
            });

            for (let userEl of document.querySelectorAll(".post-header")) {
                userEl.addEventListener("click", () => {
                    goToPage(USER_POSTS_PAGE, {
                        userId: userEl.dataset.userId,
                    });
                });
            }
        });
}

import { renderUploadImageComponent } from "./upload-image-component.js";
import { validateText } from "../helpers.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    let uploadedImageUrl = "";

    const render = () => {
        // @TODO: Реализовать страницу добавления поста - готово
        const appHtml = `
            <div class="page-container">
                <div class="header-container"></div>
                <h3>Страница добавления поста</h3>
                <div class="upload-image-container"></div>
                <input type="text" id="desc-input" class="input" placeholder="Описание изображения" />
                <button class="button" id="add-button">Добавить</button>
            </div>
        `;

        appEl.innerHTML = appHtml;

        const uploadImageContainer = appEl.querySelector(
            ".upload-image-container"
        );
        renderUploadImageComponent({
            element: uploadImageContainer,
            onImageUrlChange: (newUrl) => {
                uploadedImageUrl = newUrl;
            },
        });

        document.getElementById("add-button").addEventListener("click", () => {
            const description = validateText(
                document.getElementById("desc-input").value.trim()
            );

            onAddPostClick({
                description,
                imageUrl: uploadedImageUrl,
            });
        });
    };

    render();
}

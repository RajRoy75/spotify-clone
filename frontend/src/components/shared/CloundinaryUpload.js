import {openUploadWidget} from "../../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../utils/config";

const CloudinaryUpload = ({setUrl, fileName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "djtwqlcgo",
                uploadPreset: cloudinary_upload_preset,
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    // setUrl(result.info.secure_url);
                    // setName(result.info.original_filename);
                    setUrl(result.info.secure_url);
                    fileName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-white text-black  rounded-full p-4 font-semibold"
            onClick={uploadImageWidget}
        >
            Select File
        </button>
    );
};

export default CloudinaryUpload;
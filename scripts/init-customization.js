import Customization from '../src/modules/customization/models/CustomizationModel'

export const initCustomization = function () {

    const newCustomization = new Customization({
        color_primary: "#ff0000",
        color_secondary: "#ff00ff",
        text_primary: "#000000",
        text_secondary: "#fff000",
        logo: 'assets/logo/img.png',
        logo_title: '',
        logo_mode:'circle',
        logo_preview: 'assets/logoPreview/img.png',
        language: "es"
    })
    newCustomization.id = newCustomization._id;
    newCustomization.save()

}
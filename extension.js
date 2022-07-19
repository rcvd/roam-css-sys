let cssTheme = 'Default', 
    cssAppearance = 'Auto';
    
var modules = {"hide-logo": false, "centered-search": false, "dynamic-images": false, "no-animations": false, "subtle-controls": false};

function changeTheme() {
    var cssAppearanceStr = cssAppearance;
    
    console.log("Changing theme to: "+cssTheme);
    console.log("Changing appearance to: "+cssAppearance);
    
    var delimitor='';
    
    if (document.getElementById('css-theme')) {
        document.getElementById('css-theme').remove();
    }
    
    if (cssTheme.toLowerCase() != 'Default') {
        if (cssAppearance.toLowerCase() == 'auto') {
            cssAppearanceStr = '';
            delimitor = '';
        } else {
            delimitor = '_';
        }
        
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = 'css-theme';
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://rcvd.github.io/roam-css-system/themes/'+cssTheme.toLowerCase()+delimitor+cssAppearanceStr.toLowerCase()+'.css';
        link.media = 'all';
        head.appendChild(link);
    }
}

function changeModule(moduleName) {
    console.log("Module called: " + moduleName);
    console.log("Module status: " + modules[moduleName]);
    
    if (!modules[moduleName]) {
        if (document.getElementById(moduleName)) {
            document.getElementById(moduleName).remove();
        }
    }
    
    else {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link  = document.createElement('link');
        link.id   = moduleName;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://rcvd.github.io/roam-css-system/modules/'+moduleName+'.css';
        link.media = 'all';
        head.appendChild(link);
    }
}

function setSettingDefault(extensionAPI, settingId, settingDefault) {
    let storedSetting = extensionAPI.settings.get(settingId);
    if (null == storedSetting) extensionAPI.settings.set(settingId, settingDefault);
    return storedSetting || settingDefault;
}

const panelConfig = {
    tabTitle: "Roam CSS System III",
    settings: [
        {id:          "css-theme",
         name:        "Base Theme",
         description: "Select your base theme",
         action:      {type:     "select",
                       items:    ['Default', 'Apple', 'Bear', 'Craft', 'LessWrong', 'Quattro', 'Things'],
                       onChange:    (evt) => { cssTheme=evt; changeTheme(); }}},
        {id:          "css-appearance",
         name:        "Appearance",
         description: "Select the themes appearance",
         action:      {type:     "select",
                       items:    ['Dark', 'Light', 'Auto'],
                       onChange:    (evt) => { cssAppearance=evt; changeTheme(); }}},
        {id:          "css-hide-logo",
         name:        "Hide Logo",
         description: "Hide Roam Research Logo",
         action:      {type:     "switch",
                       onChange:    (evt) => { modules["hide-logo"]=evt.target.checked; changeModule('hide-logo'); }}},
        {id:          "css-centered-search",
         name:        "Centered Search",
         description: "Centers the find or create dialog, hides the search icon (use keyboard shortcuts :))",
         action:      {type:     "switch",
                       onChange:    (evt) => { modules["centered-search"]=evt.target.checked; changeModule('centered-search'); }}},
        {id:          "css-dynamic-images",
         name:        "Dynamic Image Sizes",
         description: "Enable dynamic image sizes (scaled to 100% width)",
         action:      {type:     "switch",
                       onChange:    (evt) => { modules["dynamic-images"]=evt.target.checked; changeModule('dynamic-images'); }}},
        {id:          "css-no-animations",
         name:        "Disable Animations",
         description: "Disable all animations and transitions to speed up the UI",
         action:      {type:     "switch",
                       onChange:    (evt) => { modules["no-animations"]=evt.target.checked; changeModule('no-animations'); }}},
        {id:          "css-subtle-controls",
         name:        "Subtle Controls",
         description: "Make controls (bullets, carets and multibars) less intrusive when block is not focused",
         action:      {type:     "switch",
                       onChange:    (evt) => { modules["subtle-controls"]=evt.target.checked; changeModule('subtle-controls'); }}}
        ]
};

function onload({extensionAPI}) {
    cssTheme = setSettingDefault(extensionAPI, "css-theme", 'Craft');
    cssAppearance = setSettingDefault(extensionAPI, "css-appearance", 'Auto');
    
    Object.keys(modules).forEach(item => {
        modules[item] = setSettingDefault(extensionAPI, 'css-'+item, false);
        console.log("Setting: "+'css-'+item);
        changeModule(item);
    })
    
    extensionAPI.settings.panel.create(panelConfig);
    
    changeTheme();
    
    console.log("Loaded Roam CSS System III");
}

function onunload() {
    console.log("Unloaded Roam CSS System III");
    
    if (document.getElementById(cssId)) {
        document.getElementById(cssId).remove();
    }
    
    Object.keys(modules).forEach(item => {
        if (document.getElementById(item)) {
            document.getElementById(item).remove();
        }
    }
    )      
}

export default {
    onload: onload,
    onunload: onunload
};

"use strict";

class Cookies {     //poniżej tworzymy metody

    constructor() {
        this.checkCookieEnabled();
    }

    checkCookieEnabled() {
        if(!navigator.cookieEnabled) {
            alert('Masz wyłączoną obsługę ciasteczek');
            return;
        }
    }

    setCookie(options) {
        const option = {
            name: options.name || 'test',
            value: options.value || 'wartosc testowa',
            days: options.days,
            path: options.path,
            domain: options.domain,
            secure: options.secure
        }
        const cookieName = encodeURIComponent(option.name);
        const cookieVal = encodeURIComponent(option.value);
        let cookieSettingTab = [];
        cookieSettingTab.push(`${cookieName} = ${cookieVal}`);
        if(typeof option.days === 'number') {
            const date = new Date();
            date.setTime(date.getTime() + (option.days * 24 * 60 * 60 * 1000));
            cookieSettingTab.push(`expires = ${date.toGMTString()}`)
        }
        if(option.domain) {
            cookieSettingTab.push(`domain = ${option.domain}`);
        }
        if(option.path) {
            cookieSettingTab.push(`path = ${option.path}`);
        }
        if(option.secure) {
            cookieSettingTab.push(`secure = ${option.secure}`);
        }

        document.cookie = cookieSettingTab.join(';');
    }

    getCookie(name) {
        if(document.cookie != '') {
            const cookies = document.cookie.split(/; */);
            for(let i = 0; i < cookies.length; i++) {
                const cookieName = cookies[i].split('=')[0];
                const cookieVal = cookies[i].split('=')[1];
                if(cookieName === decodeURIComponent(name)) {
                    return cookieVal;
                }
            }
        }
    }

    removeCookie(name) {
        const date = new Date();
        date.setTime(date.getMonth() - 1);
        document.cookie = `${name} = ; expires = ${date.toGMTString}`;
    }


}

class InfoCookie extends Cookies {

    constructor() {
        super();

        this.infoCookie = 'Informujemy, że korzystamy z informacji zapisanych w plikach cookies na urządzeniach końcowych użytkowników. Pliki te można kontrolować za pomocą ustawień przeglądarki internetowej. Dalsze korzystanie z naszego serwisu oznacza, iż akceptujesz pliki cookies.';
        
        this.textClose = '<a href="" title="Akceptuj i zamknij">Zamknij</a>';

        this.textColor = '#fff';

        this.panel = document.querySelector('.cookies');

        if(!this.getCookie('Accept')) {
            this.showInfo();
        }

        this.setInfoProperties();

    }

    showInfo() {
        this.panel.style.display = 'block';
    }

    setInfoProperties() {
        const text = document.querySelector('.cookies__text');
        text.innerHTML = this.infoCookie;
        const close = document.querySelector('.cookies__close');
        close.innerHTML = this.textClose;
    }

    hideInfo() {
        this.panel.style.display = 'none';
    }

    setCookie() {
        super.setCookie({
            name: 'Accept',
            value: 'yes',
            days: 90
        });
        this.hideInfo();
    }

}

const panel = new InfoCookie();

const closeLink = document.querySelector('.cookies a');

closeLink.addEventListener('click', (e) => {
    e.preventDefault();
    panel.setCookie();
});
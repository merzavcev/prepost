const { createServer } = require('http')
const { readFileSync } = require('fs')
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

function log(msg) {
    console.log(msg)
}

const pre = readFileSync('./chunks/pre.html', 'utf-8')
const post = readFileSync('./chunks/post.html', 'utf-8')

function getYandex(url) {
    return fetch(url, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "ru,en;q=0.9",
          "cache-control": "no-cache",
          "device-memory": "8",
          "downlink": "10",
          "dpr": "2",
          "ect": "4g",
          "pragma": "no-cache",
          "rtt": "50",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "viewport-width": "1440",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 YaBrowser/20.9.0.1697 Yowser/2.5 Safari/537.36",
          "cookie": "yandexuid=2512230851603547229; mda=0; yandex_gid=213; is_gdpr=0; is_gdpr_b=CIecPxDICCgC; gdpr=0; _ym_uid=1603547231197356087; zm=m-white_bender_zen-ssr.webp.css-https%3As3home-static_HNxLmB_0kbK3n_g02IiRukOCxQA%3Al; my=YwA=; ymex=1918907231.yrts.1603547231; font_loaded=YSv1; _ym_isad=2; ys=wprid.1603548307419263-830541923426418887600276-prestable-app-host-sas-web-yp-131; i=5KS8tGW8rZYk75EzMbYo5k6Vahsz3OYiBs2OlPTRlCByYPTkNvOCq7UKkgCYoug75BiXbTj/uKqHw9kirO66IAKzFMA=; yp=1606139230.ygu.1#1619316574.szm.2:1440x900:1440x457#1606227156.csc.2#1603635145.nwcst.1603554000_213_3#1635084308.p_sw.1603548308; _ym_d=1603549095; yabs-frequency=/5/0000000000000000/BFvoS9G0002qFI4E0tDmb0000BGz8MwASd2K0000j3rXTBnoS9G0002qFM4cRh1mbG000BGz89p_Sd2K0000j3rXUW1pS9G0002qFK6F0dDmb0000BGzGI8WG6s60000j3s16LsmS9K0002qFS40/; _ym_visorc_50377519=b"
        },
        "referrerPolicy": "unsafe-url",
        "body": null,
        "method": "GET",
        "mode": "cors"
      });
}

function getZen(key) {
    const url = `https://zen.yandex.ru/api/v3/launcher/export-cached?key=${key}&clid=500&host=zen.yandex.ru&country_code=ru&tld=ru&rnd=1603547279127`;
    console.log(url)

    return fetch(url, {
        "headers": {
          "accept": "*/*",
          "accept-language": "ru,en;q=0.9",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-zenlib-version": "2.613.0",
          "zen-client-experiments": "zen-version:2.613.0, zen_inserts_cashback:exp, zen_ad_layout:exp, zen_inserts_geo_collections:exp, zen_cache:exp, zen_disable_robot_warming_up_one_half_threshold:exp, zen_lib_rtb:exp, zen_comments:exp, zen_inserts_stream:exp, zen_inserts_edadeal:exp, zen_context_new:exp, zen_ssr:exp, zen_cache_static:exp, zen_disable_robot_warming_up:exp",
          "zen-features": "{\"no_amp_links\":true,\"forced_bulk_stats\":true,\"blurred_preview\":true,\"big_card_images\":true,\"complaints_with_reasons\":true,\"pass_experiments\":true,\"screen\":{\"dpi\":241},\"need_background_image\":true,\"color_theme\":\"white\",\"no_small_auth\":true,\"need_main_color\":true,\"need_zen_one_data\":true,\"interests_supported\":true,\"return_sources\":true,\"screens\":[\"feed\",\"category\",\"categories\",\"profile\",\"switchable_subs\",\"suggest\",\"multisearch\",\"blocked\",\"preferences\",\"subscribers\",\"blocked_suggest\",\"video_recommend\",\"language\",\"send_app_link_sms\",\"comments_counter\",\"comments_infos\",\"social_profile\",\"social_activity_feed\",\"social_profile_edit\",\"social_interests_feedback\",\"profile_onboarding_shown\",\"profile_complete_onboarding\",\"profile_deactivate\",\"profile_cancel_deactivate\",\"get_video_popup_data\"],\"stat_params_with_context\":true,\"carousel_support\":true,\"column_count\":3,\"row_placeholders\":true,\"no_videos\":true,\"disabled_yandex_block_ids\":[\"banner_inserts\",\"zen_stay_home\",\"yalocal_div2\",\"market_media\",\"praktikum\",\"div_smb\",\"div_vacancies\",\"div_vacancies\",\"edadeal\",\"geo_collections\",\"market_media\",\"media_event_carousel\",\"media_event_shows\",\"zen_music_web\",\"zen_championship\",\"stream_anim_series\",\"stream_series\"]}",
          "zen-request-id": "2944013036.451.1603547277994.16660",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 YaBrowser/20.9.0.1697 Yowser/2.5 Safari/537.36",
          "cookie": "yandexuid=2512230851603547229; mda=0; yandex_gid=213; is_gdpr=0; is_gdpr_b=CIecPxDICCgC; i=NkraqTgn49Ea6n+JdCibrPgdU887+BfuQXvdlSwRPg89yB3WzRYDjDIeOY7DaGVDNsAJsrnNUaL9rf2w/+IJdllYFcE=; gdpr=0; _ym_uid=1603547231197356087; zm=m-white_bender_zen-ssr.webp.css-https%3As3home-static_HNxLmB_0kbK3n_g02IiRukOCxQA%3Al; my=YwA=; ymex=1918907231.yrts.1603547231; _ym_isad=2; yp=1606139230.ygu.1#1619315233.szm.2:1440x900:1440x457; yabs-frequency=/5/0000000000000000/8Y10ROO0002qFK4PNR1mbG000BGzOG00/"
        },
        "referrer": "https://yandex.ru/",
        "referrerPolicy": "origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
      });
}

function startServer(port) {
    const server = createServer(function(req, res) {
        if (req.url !== '/') {
            res.end('');
            return
        }

        log(`${new Date().toISOString()} ${req.method} ${req.url}`)
        res.setHeader('Content-Type', 'text/html');

        getYandex("https://yandex.ru/")
            .then(
                function(res) {
                    return res.text();
                }
            )
            .then(function(text) {
                const parts = text.split('<div class="zen-lib__loader loader"></div>')
                res.write(parts[0])
                const dom = new JSDOM(text)
                precacheKey = JSON.parse(dom.window.document.querySelector('.zen-lib').dataset.bem)['zen-lib'].libParams.cache.precacheKey;
                console.log( 'key', precacheKey )
                return precacheKey
            })
            .then(function(precacheKey) {
                return getZen(precacheKey).then(res => res.json())
            })
            .then(function(data) {
                if (data.static) {
                    res.write(data.static.styles)
                    res.write(data.static.appRender)
                } else {
                    console.log('no static')
                }
                res.end('')
                // res.end('</body></html>')
            })
            
    })
    .listen(port)

    log(`server started http://localhost:${port}`)
}

startServer(9000)
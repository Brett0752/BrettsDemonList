import { store } from "../main.js";
import { embed } from "../util.js";
import { score } from "../score.js";
import { fetchEditors, fetchList } from "../content.js";

import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-list">
            <div class="list-container">
                <table class="list" v-if="list">
                    <tr v-for="([level, err], i) in list">
                        <td class="rank">
                            <p v-if="i + 1 <= 150" class="type-label-lg">#{{ i + 1 }}</p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level" :class="{ 'active': selected == i, 'error': !level }">
                            <button @click="selected = i">
                                <span class="type-label-lg">{{ level?.name || \`Error (\${err}.json)\` }}</span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="level-container">
                <div class="level" v-if="level">
                    <h1>{{ level.name }}</h1>
                    <LevelAuthors :author="level.author" :creators="level.creators" :verifier="level.verifier"></LevelAuthors>
                    <iframe class="video" id="videoframe" :src="video" frameborder="0"></iframe>
                    <ul class="stats">
                        <li>
                            <div class="type-title-sm">Points when completed</div>
                            <p>{{ score(selected + 1, 100, level.percentToQualify) }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">ID</div>
                            <p>{{ level.id }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Password</div>
                            <p>{{ level.password || 'Free to Copy' }}</p>
                        </li>
                    </ul>
                    <h2>Records</h2>
                    <p v-if="selected + 1 <= 75"><strong>{{ level.percentToQualify }}%</strong> or better to qualify</p>
                    <p v-else-if="selected +1 <= 150"><strong>100%</strong> or better to qualify</p>
                    <p v-else>This level does not accept new records.</p>
                    <table class="records">
                        <tr v-for="record in level.records" class="record">
                            <td class="percent">
                                <p>{{ record.percent }}%</p>
                            </td>
                            <td class="user">
                                <a :href="record.link" target="_blank" class="type-label-lg">{{ record.user }}</a>
                            </td>
                            <td class="mobile">
                                <img v-if="record.mobile" :src="\`/assets/phone-landscape\${store.dark ? '-dark' : ''}.svg\`" alt="Mobile">
                            </td>
                            <td class="hz">
                                <p>{{ record.hz }}Hz</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-else class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <p>(ノಠ益ಠ)ノ彡┻━┻</p>
                </div>
            </div>
            <div class="meta-container">
                <div class="meta">
                    <div class="errors" v-show="errors.length > 0">
                        <p class="error" v-for="error of errors">{{ error }}</p>
                    </div>
                    <div class="og">
                        <p class="type-label-md">Website layout made by <a href="https://tsl.pages.dev/" target="_blank">TheShittyList</a></p>
                    </div>
                    <template v-if="editors">
                        <h3>List Editors</h3>
                        <ol class="editors">
                            <li v-for="editor in editors">
                                <img :src="\`/assets/\${roleIconMap[editor.role]}\${store.dark ? '-dark' : ''}.svg\`" :alt="editor.role">
                                <a v-if="editor.link" class="type-label-lg link" target="_blank" :href="editor.link">{{ editor.name }}</a>
                                <p v-else>{{ editor.name }}</p>
                            </li>
                        </ol>
                    </template>
                    <h3>Top 50</h3>
                    <p>
                        These are the top 50 demons that Brett has completed in Geometry Dash
                    </p>
                    <p>
                        ________________________________
                    </p>
                    <p>
                        Changelog:
                    </p>
                    <p>
                        Death Note #43 -> #46
                    </p>
                    <p>
                        Niwa #17 -> #24
                    </p>
                    <p>
                        Auditory Breaker #N/A -> #2
                    </p>
                    <p>
                        Black Blizzard #N/A -> #2
                    </p>
                    <p>
                        Ruler Of Everything #N/A -> #5
                    </p>
                    <p>
                        Robi #N/A -> #34
                    </p>
                    <p>
                        9blue #N/A -> #39
                    </p>
                    <p>
                        NecropoliX #N/A -> #28
                    </p>
                    <p>
                        Misty Mountains #N/A -> #39
                    </p>
                    <p>
                        Leyak #N/A -> #46
                    </p>
                    <p>
                        Ragnarok #N/A -> #1
                    </p>
                    <p>
                        Make It Drop #N/A -> #39
                    </p>
                    <p>
                        Polish Alphabet #N/A -> #39
                    </p>
                    <p>
                        Meow #N/A -> #43
                    </p>
                    <p>
                        Sweater Weather #N/A -> #48
                    </p>
                    <p>
                        Kuzureta #N/A -> #3
                    </p>
                    <p>
                        Eko #N/A -> #14
                    </p>
                    <p>
                        Aftermath #N/A -> #18
                    </p>
                    <p>
                        Clarity #N/A -> #32
                    </p>
                    <p>
                        Zettabyte #N/A -> #33
                    </p>
                    <p>
                        La Llorona #16 -> #24
                    </p>
                    <p>
                        Cupid #15 -> #18
                    </p>
                    <p>
                        Broken Signal #N/A -> #34 
                    </p>
                    <p>
                        Volume #N/A -> #46
                    </p>
                    <p>
                        Stalemate Redux #N/A -> #4
                    </p>
                    <p>
                        Hot Rod #N/A -> #6
                    </p>
                    <p>
                        Shurima #N/A -> #37
                    </p>
                    <p>
                        Budding Roses #N/A -> #5
                    </p>
                    <p>
                        Pixelsonic #N/A -> #38
                    </p>
                    <p>
                        Maddening #N/A -> #13
                    </p>
                    <p>
                        Digital Descent #N/A -> #5
                    </p>
                    <p>
                        Sink #N/A -> #3
                    </p>
                    <p>
                        Gaming #N/A -> #26
                    </p>
                    <p>
                        Feel Alive #N/A -> #31
                    </p>
                </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        editors: [],
        loading: true,
        selected: 0,
        errors: [],
        roleIconMap,
        store
    }),
    computed: {
        level() {
            return this.list[this.selected][0];
        },
        video() {
            if (!this.level.showcase) {
                return embed(this.level.verification);
            }

            return embed(
                this.toggledShowcase
                    ? this.level.showcase
                    : this.level.verification
            );
        },
    },
    async mounted() {
        // Hide loading spinner
        this.list = await fetchList();
        this.editors = await fetchEditors();

        // Error handling
        if (!this.list) {
            this.errors = [
                "Failed to load list. Retry in a few minutes or notify list staff.",
            ];
        } else {
            this.errors.push(
                ...this.list
                    .filter(([_, err]) => err)
                    .map(([_, err]) => {
                        return `Failed to load level. (${err}.json)`;
                    })
            );
            if (!this.editors) {
                this.errors.push("Failed to load list editors.");
            }
        }

        this.loading = false;
    },
    methods: {
        embed,
        score,
    },
};

<template>
  <div class="header">
    <nav class="wrapper">
      <div :class="['header-nav-backdrop',{'nav-backdrop': activeBurger}]"></div>
      <div class="header-logo">
        <svg :class="['ham', 'hamRotate', 'ham1', {'activate': activeBurger}]" viewBox="0 0 100 100" width="50" @click="activating">
          <path
              class="line top"
              d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
          <path
              class="line middle"
              d="m 30,50 h 40" />
          <path
              class="line bottom"
              d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
        </svg>
        <svg height="35" width="35" xmlns="http://www.w3.org/2000/svg" viewBox="-1.7133939179489062 -1.7114203798363725 163.4247707336346 183.42284075967274"><g fill="none" fill-rule="evenodd"><path d="M80 0c2.072 0 4.144.533 6 1.598l47.658 27.376c.174.09.29.152.342.182l20 11.48c3.712 2.13 6 6.066 6 10.327V129.028c0 4.27-2.288 8.206-6 10.336l-20 11.48c-.155.088-.31.173-.468.255L86 178.402A12.049 12.049 0 0 1 80 180z" fill="#80deea"/><path d="M80 1c2.072 0 4.144.533 6 1.598l48 27.558 20 11.48a11.924 11.924 0 0 1 5.958 9.352H160c0-4.286-2.288-8.222-6-10.352l-20-11.48c-.052-.03-.168-.091-.342-.182L86 1.598A12.049 12.049 0 0 0 80 0z" fill="#9ae4ee"/><path d="M80 0v180c-2.072 0-4.144-.533-6-1.598L6.027 139.357 6 139.354a11.914 11.914 0 0 1-6-10.287v-.026-78.074a11.925 11.925 0 0 1 6-10.32l20.45-11.737.018-.009L74 1.598A12.049 12.049 0 0 1 80 0z" fill="#7e57c2"/><path d="M74 2.598L26.468 29.9 6 41.646a11.925 11.925 0 0 0-5.401 6.622A14.892 14.892 0 0 0 0 50.967a11.925 11.925 0 0 1 6-10.32L26.468 28.9 74 1.598A12.049 12.049 0 0 1 80 0v1c-2.072 0-4.144.533-6 1.598z" fill="#997ace"/><path d="M1.646 135.054a11.956 11.956 0 0 0 4.354 4.3l.027.003L74 178.402A12.049 12.049 0 0 0 80 180c2.072 0 4.144-.533 6-1.598l47.532-27.303c.157-.082.313-.167.468-.255l20-11.48a11.95 11.95 0 0 0 4.358-4.308L80 90z" fill="#ffca28"/><path d="M132.318 120.083l26.04 14.973a11.95 11.95 0 0 1-4.358 4.308l-20 11.48c-.155.088-.31.173-.468.255l-23.117 13.278L80 148l52-28z" fill="#dc9856"/><path d="M80 48l52 72-52 28z" fill="#cacaca"/><path d="M80 48v100l-52-28z" fill="#fbfbfb"/><path d="M34.167 76.74c6.909-2.623 12.413-11.067 12.295-18.86-.119-7.792-5.815-11.983-12.724-9.36-6.909 2.623-12.413 11.066-12.295 18.859s5.815 11.983 12.724 9.36z" fill="#fff"/><path d="M157.891 134.787a11.89 11.89 0 0 0 2.109-6.76v1a11.888 11.888 0 0 1-1.642 6.029z" fill="#4dd0e1"/><path d="M1.648 135.052A11.836 11.836 0 0 1 0 129.067v-.01-1.042a11.966 11.966 0 0 0 2.115 6.769z" fill="#4b3474"/><path d="M109.524 163.897L86 177.402A12.049 12.049 0 0 1 80 179c-2.072 0-4.144-.533-6-1.598L6 138.354a11.93 11.93 0 0 1-3.885-3.57l-.467.268a11.96 11.96 0 0 0 4.379 4.305L74 178.402A12.049 12.049 0 0 0 80 180c2.072 0 4.144-.533 6-1.598l24.296-13.948z" fill="#ffb418"/><path d="M157.891 134.787a11.956 11.956 0 0 1-3.891 3.577l-44.476 25.533.891.48 23.117-13.278c.157-.082.313-.167.468-.255l20-11.48a11.98 11.98 0 0 0 4.308-4.224z" fill="#ce6e33"/></g></svg>
        <h2>Curator</h2>
      </div>
      <ul :class="['header-nav-ul', {'activate': activeBurger}]">
        <li>
          <router-link to="/templates" @click="activeBurger = false">Templates</router-link>
        </li>
        <li>
          <router-link to="/requests" @click="activeBurger = false">Requests</router-link>
        </li>
        <li>
          <router-link to="/todo" @click="activeBurger = false">Organizer</router-link>
        </li>
        <li>
          <router-link to="/weather" @click="activeBurger = false">Weather</router-link>
        </li>
      </ul>
      <span class="header-logout">
          <router-link to="/" @click="logout">Logout</router-link>
          <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" width="24" height="24" style="vertical-align:top"><path fill="currentColor" d="M12.26 17.98A2 2 0 0014 19h5a2 2 0 002-2V7a2 2 0 00-2-2h-5a2 2 0 00-1.74 1.02l3.86 3.86a3 3 0 010 4.24l-3.86 3.86z"></path><path fill="currentColor" d="M9.3 7.3a1 1 0 011.4 0l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.4-1.4l3.29-3.3-3.3-3.3a1 1 0 010-1.4z"></path><path fill="currentColor" d="M10.7 7.3a1 1 0 00-1.4 1.4l2.29 2.3H3.86c-.48 0-.86.45-.86 1s.38 1 .86 1h7.73l-2.3 2.3a1 1 0 101.42 1.4l3.8-3.8c.29-.16.49-.5.49-.9s-.2-.74-.49-.9l-3.8-3.8z"></path></svg>
      </span>
    </nav>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from 'vue'
export default {
  setup() {
    const store = useStore()
    const activeBurger = ref(false)
    return {
      activeBurger,
      logout: () => {
        store.commit('logout')
      },
      activating() {
        activeBurger.value = !activeBurger.value
      }
    }
  }
}
</script>

<style lang="scss">
@import "../styles/variable";
.header {
  background-color: $navBackgroundColor;
}
.header .wrapper {
justify-content: space-between;
}
.header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  h2 {
    font-size: $h2fz;
    text-transform: uppercase;
    padding: $navPad;
  }
}
.header-nav-ul {
  display: flex;
  li {
    padding: $navPad;
    color: $navLiColor;
  }
  li:hover {
    color: $navLiColorHover;
    border-bottom: 2px solid $navLiColor;
  }
  a {
    color: $navLiColor;
    &:hover {
      color: $navLiColorHover;
    }
  }
}
.header-logout {
  display: flex;
  align-items: center;
  a {
    color: $navLogout;
  }
  svg {
    color: $navLogout;
    margin-top: -1px;
  }
  &:hover {
    margin-top: -2px;
    svg, a {
      color: $navLiColorHover;
    }
  }
}
.ham.hamRotate.ham1 {
  display: none;
}
.header-nav-backdrop {
  display: none;
}
@media (max-width: 768px) {
  .header {
    background-color: $navBackgroundColor;
  }
  .ham.hamRotate.ham1 {
    display: inline-block;
    &.activate {
      transform: translateX(280px) rotate(45deg);
      z-index: 1001;
    }
  }
  .header-nav-ul {
    position: fixed;
    flex-direction: column;
    background-color: white;
    height: 100%;
    width: 380px;
    transform: translateX(-420px);
    transition: 0.5s;
    li:nth-child(1) {
      margin-top: 40px;
    }
    li {
      border-bottom: 1px solid $navLiColor;
      margin: 0 20px 0 30px;
    }
    &.activate {
      transform: translateX(-45px);
      z-index: 1000;
    }
  }
  .header-logout {
    margin-right: 25px;
  }
  .header-logo {
    h2 {
      font-size: 14px;
    }
  }
  .nav-backdrop {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.4;
  }
}
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.activate {
  transform: rotate(45deg);
}
.hamRotate180.activate {
  transform: rotate(180deg);
}
.line {
  fill:none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke:#000;
  stroke-width:5.5;
  stroke-linecap:round;
}
.ham1 .top {
  stroke-dasharray: 40 139;
}
.ham1 .bottom {
  stroke-dasharray: 40 180;
}
.ham1.activate .top {
  stroke-dashoffset: -98px;
}
.ham1.activate .bottom {
  stroke-dashoffset: -138px;
}
.active {
  border-bottom: 2px solid $navLiColor;
}
</style>
import qs from 'qs'
import bottom_option from '~/components/common/bottom_option'
const msg = '请输入正确的手机号码',
      start = 60 // 倒计时开始的值

export default{
    data() {
        return {
            type: 'code', // 登陆方式  code代表验证码   password代码密码
            phone: '',
            code: '', // 验证码
            auth_value: '', //校验码
            password: '',
            visible: false,  // 密码是否可见
            redirect: '',
            canSend: true,  // 是否可以发送验证码
            number: start, // 倒计时
            msg: msg,
            show: false,
            icons: [
                // require('icons/password-hide.png'),
                // require('icons/password-visible.png'),
            ],
            show_option: false,
            pass_auth_code: '',
        }
    },
    components: { bottom_option },
    props: ['bind_mobile', 'auth_code', 'auth_type'],
    methods: {
        submitMsg() {
            if(!this.allFilled) return

            if(!this.phoneValid) {
                __tostal(msg)
                return
            }
            if (this.bind_mobile) this.$emit('bindmobile', this.phone, this.code)
            else this.$emit('tologin', this.type, this.phone, this.code, this.password)
        },
        async sendCode() {
            if(!this.phoneValid) return __tostal(msg)
            
            if (this.bind_mobile) {
                let url = `/user/check_mobile_and_source?mobile=${this.phone.toString().trim()}&source=2`
                
                let resp = await this.$axios.get(url)
                    resp = resp.data
                if (resp.code) return __tostal(resp.msg || '查询绑定状态错误')
                if (resp.data.type !== 'NEW_USER') return this.show_option = true
            }

            if(!this.auth_value) return __tostal('请先输入正确的计算结果，再获取验证码')
            if(!this.pass_auth_code.kaptcha_key) return __tostal('唇唇出了一些问题。。。')

            let resp = await this.$axios.post('trunk::/api/auth/send_sms_login', qs.stringify({
                m: this.phone.toString().trim(),
                key: this.pass_auth_code.kaptcha_key,
                value: this.auth_value
            }))
                resp = resp.data
            
            if(resp.code !== '0'){
                this.reload_pass_auth_code()
                return __tostal(resp.msg || '发送验证码错误')
            }

            this.canSend = false
            
            this.$nextTick(()=>{
                this.$refs.input.focus()
            })

            this.countdown()
        },
        countdown() {
            if(this.number === 0) {
                this.number = start
                this.canSend = true
                return
            }
            setTimeout(() => {
                this.number--
                this.countdown()
            }, 1000)
        },
        option_confirm(){
            window.location.href = "tel:4009951066"
        },
        option_cancel(){
            this.show_option = false
        },
        async reload_pass_auth_code(){
            this.auth_value = ''
            let resp = await this.$axios.get('https://test1.xiaohongchun.com/user/v1/get_verify_code')
                resp = resp.data
            if (resp.code) return __tostal(resp.msg || '获取失败了。。。')
            this.pass_auth_code = resp.data
        },
    },
    computed: {
        // 判断用户是否可以点击登陆按钮
        allFilled() {
            if(this.phone.toString().trim()) {
                if(this.type === 'code' && this.code.toString().trim()) {
                    return true
                }

                if(this.type === 'password' && this.password.trim()) {
                    return true
                }
            }

            return false
        },
        phoneValid() {
            return this.phone.toString().trim().length === 11
        }
    },
    mounted(){
        this.reload_pass_auth_code()
    },
    watch: {
        auth_type(){
            this.type = this.auth_type
        }
    }
}
